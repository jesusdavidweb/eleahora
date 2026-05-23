<script lang="ts">
  import { onMount } from 'svelte';

  const COOKIE_NAME = 'cookieconsent';
  const COOKIE_EXPIRY_DAYS = 365;

  let visible = false;
  let dismissing = false;

  function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name: string, value: string, days: number) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }

  function acceptAll() {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
    dismiss();
  }

  function rejectAll() {
    setCookie(COOKIE_NAME, 'rejected', COOKIE_EXPIRY_DAYS);
    dismiss();
  }

  function dismiss() {
    dismissing = true;
    setTimeout(() => {
      visible = false;
    }, 400);
  }

  onMount(() => {
    if (getCookie(COOKIE_NAME)) return;
    visible = true;
  });
</script>

{#if visible}
  <div class="cookie-banner" class:dismissing={dismissing} role="dialog" aria-label="Aviso de cookies" aria-describedby="cookie-banner-text">
    <div class="cookie-banner-content max-w-screen">
      <p id="cookie-banner-text">
        Esta web utiliza cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico.
        Puedes aceptarlas todas o rechazarlas.
        <a href="/legal/politica-de-cookies">Más información</a>.
      </p>
      <div class="cookie-banner-actions">
        <button class="cookie-btn cookie-btn--accept" type="button" onclick={acceptAll}>
          Aceptar todas
        </button>
        <button class="cookie-btn cookie-btn--reject" type="button" onclick={rejectAll}>
          Solo necesarias
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    background-color: var(--color-primary-dark);
    color: var(--color-background);
    padding: 1.25rem 0;
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
    animation: cookie-slide-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    will-change: transform, opacity;
  }

  .cookie-banner.dismissing {
    animation: cookie-slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes cookie-slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes cookie-slide-down {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  .cookie-banner-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  @media (min-width: 768px) {
    .cookie-banner-content {
      flex-direction: row;
      gap: 2rem;
    }
  }

  .cookie-banner-content p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--color-background);
    opacity: 0.92;
    line-height: 1.5;
    flex: 1;
    font-family: var(--font-base);
  }

  .cookie-banner-content a {
    color: var(--color-earth);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: var(--transition-smooth);
    white-space: nowrap;
  }

  .cookie-banner-content a:hover {
    opacity: 0.8;
  }

  .cookie-banner-actions {
    display: flex;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .cookie-btn {
    appearance: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.4rem;
    border-radius: 999px;
    font-family: var(--font-base);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid transparent;
    transition: var(--transition-smooth);
    white-space: nowrap;
  }

  .cookie-btn--accept {
    background-color: var(--color-accent-red);
    color: var(--color-background);
    border-color: var(--color-accent-red);
  }

  .cookie-btn--accept:hover {
    background-color: var(--color-earth);
    border-color: var(--color-earth);
  }

  .cookie-btn--accept:focus-visible {
    outline: 2px solid var(--color-background);
    outline-offset: 3px;
  }

  .cookie-btn--reject {
    background-color: transparent;
    color: var(--color-background);
    border-color: rgba(253, 251, 236, 0.35);
  }

  .cookie-btn--reject:hover {
    border-color: var(--color-background);
    background-color: rgba(253, 251, 236, 0.08);
  }

  .cookie-btn--reject:focus-visible {
    outline: 2px solid var(--color-background);
    outline-offset: 3px;
  }
</style>
