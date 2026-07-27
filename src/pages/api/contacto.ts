import type { APIRoute } from 'astro';

const CONTACT_FROM_EMAIL = 'Eleahora <info@eleahora.com>';
const CONTACT_TO_EMAIL = 'info@eleahora.com';
const RESEND_API_URL = 'https://api.resend.com/emails';

function getResendApiKey(locals: App.Locals): string | undefined {
  return locals.runtime.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const GET: APIRoute = async ({ redirect }) => {
  return redirect('/contacto');
};

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const formData = await request.formData();

  const nombre = (formData.get('nombre')?.toString() ?? '').trim();
  const email = (formData.get('email')?.toString() ?? '').trim();
  const telefono = (formData.get('telefono')?.toString() ?? '').trim();
  const servicio = (formData.get('servicio')?.toString() ?? '').trim();
  const mensaje = (formData.get('mensaje')?.toString() ?? '').trim();
  const consentimiento = formData.get('consentimiento')?.toString() ?? '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nombreEncoded = encodeURIComponent(nombre);

  console.info('[contacto-api] Contact form submission received', {
    hasNombre: Boolean(nombre),
    hasEmail: Boolean(email),
    hasTelefono: Boolean(telefono),
    hasServicio: Boolean(servicio),
    hasMensaje: Boolean(mensaje),
    hasConsentimiento: Boolean(consentimiento),
    origen: (formData.get('origen')?.toString() ?? '').trim() || 'unknown',
  });

  if (!nombre || !email || !emailRegex.test(email) || !servicio || !mensaje || !consentimiento) {
    console.warn('[contacto-api] Validation failed, redirecting to thank-you page', {
      hasNombre: Boolean(nombre),
      validEmail: emailRegex.test(email),
      hasServicio: Boolean(servicio),
      hasMensaje: Boolean(mensaje),
      hasConsentimiento: Boolean(consentimiento),
    });
    return redirect(`/gracias?nombre=${nombreEncoded}`);
  }

  try {
    const resendApiKey = getResendApiKey(locals);
    if (!resendApiKey) {
      console.error('[contacto-api] Missing RESEND_API_KEY in runtime environment');
      return redirect(`/gracias?nombre=${nombreEncoded}`);
    }

    // Llamada directa a la API REST de Resend (sin SDK) para evitar la peer
    // dep opcional @react-email/render que el SDK importa estáticamente y
    // que el bundler de Cloudflare workerd no puede resolver al desplegar.
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Nuevo contacto de ${nombre} — Eleahora`,
        html: `
          <h2>Nuevo contacto desde la web</h2>
          <table>
            <tr><td><strong>Nombre:</strong></td><td>${escapeHtml(nombre)}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${escapeHtml(email)}</td></tr>
            <tr><td><strong>WhatsApp:</strong></td><td>${escapeHtml(telefono) || 'No proporcionado'}</td></tr>
            <tr><td><strong>Servicio:</strong></td><td>${escapeHtml(servicio)}</td></tr>
          </table>
          <h3>Mensaje</h3>
          <p>${escapeHtml(mensaje).replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color:#666;font-size:0.85em;">Este mensaje fue enviado desde el formulario de contacto de Eleahora.</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => ({}))) as { message?: string; name?: string };
      console.error('[contacto-api] Resend rejected send request', {
        status: response.status,
        message: errorBody?.message ?? `HTTP ${response.status}`,
        name: errorBody?.name ?? 'UnknownError',
      });
      console.error('[contacto-api] Verify that CONTACT_FROM_EMAIL uses a verified domain in Resend.');
    } else {
      const data = (await response.json().catch(() => ({}))) as { id?: string };
      console.info('[contacto-api] Resend accepted send request', {
        id: data?.id ?? null,
      });
    }
  } catch (error) {
    const details =
      error instanceof Error
        ? {
            message: error.message,
            name: error.name,
            stack: error.stack,
          }
        : { error };

    console.error('[contacto-api] Unexpected error while sending email with Resend', details);
    console.error('[contacto-api] Verify that CONTACT_FROM_EMAIL uses a verified domain in Resend.');
  }

  return redirect(`/gracias?nombre=${nombreEncoded}`);
};
