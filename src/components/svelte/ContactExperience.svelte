<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { getGsap } from '../../animations/gsap-config';
  import { revealFromBottom } from '../../animations/scroll-trigger-utils';

  let ctx: gsap.Context | undefined;
  const removeMagneticListeners: Array<() => void> = [];

  onMount(() => {
    const { gsap } = getGsap();

    ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

      heroTimeline
        .fromTo(
          '.contact-orbit',
          { scale: 0.75, opacity: 0, rotate: -8 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.2, stagger: 0.16 }
        )
        .fromTo(
          '.contact-hero-animate',
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, stagger: 0.1 },
          '-=0.9'
        )
        .fromTo(
          '.contact-glow',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=1.1'
        );

      gsap.to('.contact-orbit', {
        rotate: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%'
      });

      revealFromBottom(gsap, '.contact-reveal', 0.04, 48);

      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step, index) => {
        gsap.fromTo(
          step,
          { x: -26, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            delay: index * 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%'
            }
          }
        );
      });

      if (window.matchMedia('(min-width: 1024px)').matches) {
        const panel = document.querySelector('.contact-process-panel');
        const grid = document.querySelector('.contact-main-grid');

        if (panel && grid) {
          gsap.to(panel, {
            scrollTrigger: {
              trigger: grid,
              start: 'top top+=110',
              end: 'bottom bottom-=110',
              pin: true,
              pinSpacing: true
            }
          });
        }
      }

      gsap.utils.toArray<HTMLElement>('.magnetic-cta').forEach((button) => {
        const handleMove = (event: MouseEvent) => {
          const bounds = button.getBoundingClientRect();
          const strength = 18;
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength;

          gsap.to(button, { x, y, duration: 0.28, ease: 'power2.out' });
        };

        const handleLeave = () => {
          gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' });
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

  onDestroy(() => {
    removeMagneticListeners.forEach((removeListener) => removeListener());
    ctx?.revert();
  });
</script>

<slot />
