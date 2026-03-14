import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let isRegistered = false;

export function getGsap() {
  if (typeof window !== 'undefined' && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;

    // Con Astro View Transitions, tras cada navegación SPA el DOM cambia.
    // Limpiamos los ScrollTriggers del contexto anterior y refrescamos
    // para que las animaciones de la nueva página calculen posiciones correctas.
    document.addEventListener('astro:before-swap', () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    });

    document.addEventListener('astro:page-load', () => {
      // Pequeño delay para asegurar que el nuevo DOM ya está pintado
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }

  return { gsap, ScrollTrigger };
}
