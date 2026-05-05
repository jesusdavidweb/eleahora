/**
 * Helpers para leer contenido de Keystatic desde páginas Astro.
 * Usa createReader de @keystatic/core/reader para acceso a ficheros locales.
 */
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getSiteConfig() {
  return await reader.singletons.siteConfig.read();
}

export async function getHomePage() {
  return await reader.singletons.homePage.read();
}

export async function getAboutPage() {
  return await reader.singletons.aboutPage.read();
}

export async function getSessionesPage() {
  return await reader.singletons.sessionesPage.read();
}

export async function getWorkshopPage() {
  return await reader.singletons.workshopPage.read();
}

export async function getContactoPage() {
  return await reader.singletons.contactoPage.read();
}

export async function getAllSesiones() {
  return await reader.collections.sesiones.all();
}

export async function getAllTestimonios() {
  return await reader.collections.testimonios.all();
}
