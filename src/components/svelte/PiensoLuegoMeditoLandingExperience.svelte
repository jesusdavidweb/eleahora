<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { getGsap } from '../../animations/gsap-config';
  import { revealFromBottom } from '../../animations/scroll-trigger-utils';

  let ctx: gsap.Context | undefined;
  const removeMagneticListeners: Array<() => void> = [];

  onMount(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { gsap, ScrollTrigger } = getGsap();

    if (reduceMotion) {
      gsap.set(
        '.plm-hero-kicker, .plm-hero-title span, .plm-hero-copy, .plm-hero-action, .plm-hero-note, .plm-hero-card, .plm-reveal, .plm-step, .plm-benefit, .plm-testimonial',
        { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform' }
      );
      return;
    }

    ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

      heroTimeline
        .fromTo('.plm-hero-card', { opacity: 0, y: 54, rotate: -4, scale: 0.92 }, { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.25, stagger: 0.12 })
        .fromTo('.plm-hero-kicker', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75 }, '-=0.9')
        .fromTo('.plm-hero-title span', { opacity: 0, y: 90, rotateX: -72 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.09, transformOrigin: '50% 100%' }, '-=0.55')
        .fromTo('.plm-hero-copy', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, '-=0.55')
        .fromTo('.plm-hero-action, .plm-hero-note', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.06 }, '-=0.35');

      gsap.to('.plm-hero-card--primary', {
        yPercent: -9,
        rotate: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: '.plm-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.plm-hero-card--secondary', {
        yPercent: 15,
        rotate: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.plm-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.plm-floating-word', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.plm-slogan',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      revealFromBottom(gsap, '.plm-reveal', 0.05, 58);
      revealFromBottom(gsap, '.plm-benefit', 0.04, 42);
      revealFromBottom(gsap, '.plm-testimonial', 0.06, 48);

      gsap.utils.toArray<HTMLElement>('.plm-story-image').forEach((image) => {
        gsap.to(image, {
          yPercent: -16,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.plm-step').forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0.35, x: index % 2 === 0 ? -64 : 64, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 78%',
              end: 'bottom 45%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      const journey = document.querySelector('.plm-journey-pin');
      const steps = gsap.utils.toArray<HTMLElement>('.plm-step');

      if (journey && steps.length && window.matchMedia('(min-width: 1024px)').matches) {
        ScrollTrigger.create({
          trigger: journey,
          start: 'top top+=96',
          end: 'bottom bottom-=120',
          pin: '.plm-journey-aside',
          pinSpacing: false
        });

        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index)
          });
        });
      }

      gsap.utils.toArray<HTMLElement>('.plm-magnetic').forEach((button) => {
        const handleMove = (event: MouseEvent) => {
          const bounds = button.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 20;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
          gsap.to(button, { x, y, duration: 0.24, ease: 'power2.out' });
        };

        const handleLeave = () => {
          gsap.to(button, { x: 0, y: 0, duration: 0.52, ease: 'elastic.out(1, 0.45)' });
        };

        button.addEventListener('mousemove', handleMove);
        button.addEventListener('mouseleave', handleLeave);
        removeMagneticListeners.push(() => {
          button.removeEventListener('mousemove', handleMove);
          button.removeEventListener('mouseleave', handleLeave);
        });
      });
    });
  });

  function setActiveStep(index: number) {
    document.documentElement.style.setProperty('--plm-active-step', String(index + 1));
    document.querySelectorAll('.plm-step-dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });
  }

  onDestroy(() => {
    removeMagneticListeners.forEach((removeListener) => removeListener());
    ctx?.revert();
  });
</script>

<slot />
