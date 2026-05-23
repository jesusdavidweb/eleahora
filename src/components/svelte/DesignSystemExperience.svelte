<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { getGsap } from '../../animations/gsap-config';

  let ctx: gsap.Context | undefined;
  const removeListeners: Array<() => void> = [];

  function setActiveNav(id: string) {
    document.querySelectorAll<HTMLAnchorElement>('.ds-section-nav a').forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  }

  function updateSpotlight(label: string, value: string, color?: string, family?: string) {
    const preview = document.querySelector<HTMLElement>('.ds-token-preview');
    const title = document.querySelector<HTMLElement>('[data-token-preview-label]');
    const meta = document.querySelector<HTMLElement>('[data-token-preview-value]');

    if (!preview || !title || !meta) return;

    title.textContent = label;
    meta.textContent = value;

    if (color) {
      preview.style.setProperty('--spotlight-color', color);
    }

    if (family) {
      preview.style.fontFamily = family;
    } else {
      preview.style.removeProperty('font-family');
    }
  }

  onMount(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.ds-hero-item, .ds-reveal, .ds-asset-card', { opacity: 1, y: 0, clearProps: 'transform' });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .fromTo('.ds-hero-logo', { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 })
        .fromTo('.ds-hero-item', { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 0.95, stagger: 0.1 }, '-=0.55')
        .fromTo('.ds-hero-image', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.2 }, '-=0.9');

      gsap.utils.toArray<HTMLElement>('.ds-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 54 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.ds-parallax').forEach((element) => {
        gsap.to(element, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.ds-watch-section').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive && section.id) setActiveNav(section.id);
          },
        });
      });
    });

    document.querySelectorAll<HTMLElement>('.ds-magnetic').forEach((element) => {
      if (reduceMotion) return;

      const handleMove = (event: MouseEvent) => {
        const bounds = element.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
        gsap.to(element, { x, y, duration: 0.28, ease: 'power2.out' });
      };

      const handleLeave = () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' });
      };

      element.addEventListener('mousemove', handleMove);
      element.addEventListener('mouseleave', handleLeave);
      removeListeners.push(() => {
        element.removeEventListener('mousemove', handleMove);
        element.removeEventListener('mouseleave', handleLeave);
      });
    });

    document.querySelectorAll<HTMLElement>('.ds-color-card').forEach((card) => {
      const handleEnter = () => {
        updateSpotlight(card.dataset.tokenName ?? 'Token', card.dataset.tokenValue ?? '', card.dataset.tokenValue);
      };

      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('focus', handleEnter);
      removeListeners.push(() => {
        card.removeEventListener('mouseenter', handleEnter);
        card.removeEventListener('focus', handleEnter);
      });
    });

    document.querySelectorAll<HTMLElement>('.ds-type-sample').forEach((sample) => {
      const handleEnter = () => {
        updateSpotlight(
          sample.dataset.tokenName ?? 'Tipografia',
          sample.dataset.tokenValue ?? '',
          undefined,
          sample.dataset.tokenFamily,
        );
      };

      sample.addEventListener('mouseenter', handleEnter);
      sample.addEventListener('focus', handleEnter);
      removeListeners.push(() => {
        sample.removeEventListener('mouseenter', handleEnter);
        sample.removeEventListener('focus', handleEnter);
      });
    });
  });

  onDestroy(() => {
    removeListeners.forEach((removeListener) => removeListener());
    ctx?.revert();
  });
</script>

<slot />
