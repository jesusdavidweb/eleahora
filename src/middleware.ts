import { defineMiddleware } from 'astro:middleware';

/**
 * Middleware de autenticación para proteger la ruta /keystatic
 * Usa Basic Auth con credenciales desde variables de entorno
 */

export const onRequest = defineMiddleware(async (context, next) => {
  // ============================================
  // Proxy trust: reescribir URL cuando el sitio
  // está detrás de un reverse proxy (Caddy/Dokploy)
  // para que context.request.url use el dominio público.
  //
  // Keystatic lee req.url directamente (no context.url),
  // por eso reemplazamos el objeto Request completo.
  // ============================================
  const forwardedProto = context.request.headers.get('x-forwarded-proto');
  const forwardedHost = context.request.headers.get('x-forwarded-host');

  if (forwardedProto && forwardedHost) {
    const newUrl = new URL(context.url);
    newUrl.protocol = forwardedProto + ':';
    newUrl.host = forwardedHost;

    // Reemplazar context.url
    Object.defineProperty(context, 'url', {
      value: newUrl,
      writable: false,
      enumerable: true,
      configurable: true,
    });

    // Reemplazar context.request con un Request que tenga la URL pública,
    // preservando el resto de propiedades (headers, method, body).
    const newRequest = new Request(newUrl.toString(), context.request);

    Object.defineProperty(context, 'request', {
      value: newRequest,
      writable: false,
      enumerable: true,
      configurable: true,
    });
  }

  // Solo proteger rutas de Keystatic
  if (!context.url.pathname.startsWith('/keystatic')) {
    return next();
  }

  // Leer variables en tiempo de ejecución (no al cargar el módulo)
  const AUTH_USER = process.env.KEYSTATIC_USER;
  const AUTH_PASS = process.env.KEYSTATIC_PASSWORD;

  // Si no hay credenciales configuradas, denegar acceso con mensaje útil
  if (!AUTH_USER || !AUTH_PASS) {
    const missing = [];
    if (!AUTH_USER) missing.push('KEYSTATIC_USER');
    if (!AUTH_PASS) missing.push('KEYSTATIC_PASSWORD');

    return new Response(
      `Keystatic auth not configured. Missing environment variables: ${missing.join(', ')}. ` +
      `Please set them in Dokploy (Applications → Environment Variables) and redeploy.`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }

  const basicAuth = context.request.headers.get('authorization');

  if (!basicAuth || !basicAuth.startsWith('Basic ')) {
    return new Response('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Keystatic Admin"',
      },
    });
  }

  // Decodificar credenciales
  try {
    const authValue = basicAuth.split(' ')[1];
    const decoded = atob(authValue);
    const [user, pwd] = decoded.split(':');

    if (user === AUTH_USER && pwd === AUTH_PASS) {
      return next();
    }
  } catch {
    // Error decodificando
  }

  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Keystatic Admin"',
    },
  });
});
