<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';
  import { gsap } from 'gsap';
  import { getGsap } from '../../animations/gsap-config';

  export let title = 'Meditación gratuita';
  export let closeText = 'Cerrar';
  export let closeAriaLabel = 'Cerrar meditación';
  export let iframeTitle = 'Insight Timer Embed: Maria Eleonora Corallo';
  export let embedUrl = 'https://widgets.insighttimer.com/publisher/Qi5htL7vZhRNNN9BOvdTdSUt6E32?created_at=1776166254';

  let isOpen = false;
  let isAnimating = false;
  let shouldRender = false;
  let shouldLoadIframe = false;

  let overlayElement: HTMLDivElement | null = null;
  let dialogElement: HTMLDivElement | null = null;
  let closeButtonElement: HTMLButtonElement | null = null;

  let triggerElement: HTMLElement | null = null;
  let previousActiveElement: HTMLElement | null = null;
  let closeTimeline: gsap.core.Timeline | null = null;
  const removeListeners: Array<() => void> = [];

  function lockBodyScroll() {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.style.overflow = 'hidden';
  }

  function unlockBodyScroll() {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.style.overflow = '';
  }

  async function openModal() {
    if (isOpen || isAnimating) {
      return;
    }

    previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    isOpen = true;
    shouldRender = true;
    shouldLoadIframe = true;
    lockBodyScroll();

    await tick();

    if (!overlayElement || !dialogElement) {
      return;
    }

    const { gsap } = getGsap();

    closeTimeline?.kill();
    isAnimating = true;

    gsap.set(overlayElement, { opacity: 0 });
    gsap.set(dialogElement, {
      opacity: 0,
      y: 28,
      scale: 0.95,
      transformOrigin: '50% 50%',
      willChange: 'transform, opacity'
    });

    gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        isAnimating = false;
        dialogElement?.style.removeProperty('will-change');
        closeButtonElement?.focus();
      }
    })
      .to(overlayElement, { opacity: 1, duration: 0.28 }, 0)
      .to(dialogElement, { opacity: 1, y: 0, scale: 1, duration: 0.42 }, 0.02);
  }

  function finalizeClose() {
    isOpen = false;
    shouldRender = false;
    shouldLoadIframe = false;
    isAnimating = false;
    unlockBodyScroll();
    previousActiveElement?.focus();
  }

  function closeModal() {
    if (!isOpen || isAnimating || !overlayElement || !dialogElement) {
      return;
    }

    const { gsap } = getGsap();

    isAnimating = true;

    closeTimeline?.kill();
    closeTimeline = gsap
      .timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: finalizeClose
      })
      .to(dialogElement, { opacity: 0, y: 20, scale: 0.97, duration: 0.24 }, 0)
      .to(overlayElement, { opacity: 0, duration: 0.22 }, 0.02);
  }

  function onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function onGlobalKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      closeModal();
    }
  }

  onMount(() => {
    triggerElement = document.querySelector('[data-meditation-modal-trigger]');

    if (triggerElement) {
      const handleClick = (event: Event) => {
        event.preventDefault();
        openModal();
      };

      triggerElement.addEventListener('click', handleClick);
      removeListeners.push(() => triggerElement?.removeEventListener('click', handleClick));
    }

    window.addEventListener('keydown', onGlobalKeydown);
    removeListeners.push(() => window.removeEventListener('keydown', onGlobalKeydown));
  });

  onDestroy(() => {
    removeListeners.forEach((removeListener) => removeListener());
    closeTimeline?.kill();
    unlockBodyScroll();
  });
</script>

{#if shouldRender}
  <div
    class="meditation-modal"
    role="presentation"
    bind:this={overlayElement}
    on:click={onOverlayClick}
  >
    <div
      class="meditation-modal__dialog"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      aria-labelledby="meditation-modal-title"
      bind:this={dialogElement}
    >
      <button
        class="meditation-modal__close"
        type="button"
        aria-label={closeAriaLabel}
        on:click={closeModal}
        bind:this={closeButtonElement}
      >
        {closeText}
      </button>

      <h2 id="meditation-modal-title" class="meditation-modal__title">
        {title}
      </h2>

      {#if shouldLoadIframe}
        <iframe
          style="border-radius:16px"
          width="100%"
          height="455px"
          title={iframeTitle}
          frameborder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          src={embedUrl}
        ></iframe>
      {/if}
    </div>
  </div>
{/if}

<style>
  .meditation-modal {
    position: fixed;
    inset: 0;
    z-index: 1200;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgba(26, 14, 26, 0.66);
    backdrop-filter: blur(5px);
  }

  .meditation-modal__dialog {
    width: min(760px, 100%);
    max-height: 92vh;
    overflow: auto;
    border-radius: 1.35rem;
    border: 1px solid rgba(253, 251, 236, 0.35);
    background: linear-gradient(160deg, rgba(59, 38, 57, 0.95), rgba(86, 100, 67, 0.9));
    color: var(--color-background);
    padding: 1.2rem;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  }

  .meditation-modal__title {
    margin: 0 0 1rem;
    font-family: var(--font-primary);
    font-size: clamp(1.25rem, 3vw, 1.6rem);
    color: var(--color-earth);
  }

  .meditation-modal__close {
    appearance: none;
    cursor: pointer;
    display: inline-flex;
    margin: 0 0 1rem auto;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(253, 251, 236, 0.4);
    background: rgba(253, 251, 236, 0.12);
    color: var(--color-background);
    font-family: var(--font-base);
    font-size: 0.9rem;
    transition: var(--transition-smooth);
  }

  .meditation-modal__close:hover {
    border-color: var(--color-earth);
    background: rgba(187, 137, 107, 0.2);
  }

  .meditation-modal__close:focus-visible {
    outline: 2px solid var(--color-earth);
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    .meditation-modal {
      padding: 0.75rem;
    }

    .meditation-modal__dialog {
      border-radius: 1rem;
      padding: 0.85rem;
    }
  }
</style>
