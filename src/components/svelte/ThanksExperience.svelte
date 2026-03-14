<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { getGsap } from '../../animations/gsap-config';

  let ctx: gsap.Context | undefined;
  const removeMagneticListeners: Array<() => void> = [];

  onMount(() => {
    const { gsap } = getGsap();

    ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          '.thanks-hero-animate',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }
        )
        .fromTo(
          '.thanks-card',
          { y: 48, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 1.05 },
          '-=0.5'
        );

      gsap.to('.thanks-halo', {
        yPercent: -8,
        scale: 1.08,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.35
      });

      gsap.fromTo(
        '.thanks-next-step',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.92,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.thanks-steps',
            start: 'top 80%'
          }
        }
      );

      gsap.utils.toArray<HTMLElement>('.thanks-magnetic').forEach((button) => {
        const handleMove = (event: MouseEvent) => {
          const bounds = button.getBoundingClientRect();
          const strength = 16;
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
