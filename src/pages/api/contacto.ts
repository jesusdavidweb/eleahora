import type { APIRoute } from 'astro';
import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const nombre = (formData.get('nombre')?.toString() ?? '').trim();
  const email = (formData.get('email')?.toString() ?? '').trim();
  const telefono = (formData.get('telefono')?.toString() ?? '').trim();
  const servicio = (formData.get('servicio')?.toString() ?? '').trim();
  const mensaje = (formData.get('mensaje')?.toString() ?? '').trim();
  const consentimiento = formData.get('consentimiento')?.toString() ?? '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nombreEncoded = encodeURIComponent(nombre);

  if (!nombre || !email || !emailRegex.test(email) || !servicio || !mensaje || !consentimiento) {
    return redirect(`/gracias?nombre=${nombreEncoded}`);
  }

  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'info@eleahora.com',
      to: 'info@eleahora.com',
      replyTo: email,
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
      `
    });
  } catch (error) {
    console.error('Error enviando email con Resend:', error);
  }

  return redirect(`/gracias?nombre=${nombreEncoded}`);
};
