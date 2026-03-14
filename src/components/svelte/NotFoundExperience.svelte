<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { getGsap } from '../../animations/gsap-config';

  let ctx: gsap.Context | undefined;
  const removeMagneticListeners: Array<() => void> = [];

  onMount(() => {
    const { gsap } = getGsap();

    ctx = gsap.context(() => {
      // Entrada del contenido
      gsap.fromTo(
        '.notfound-animate',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      );

      // Número 404 flotante sutil
      gsap.to('.notfound-number', {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Botones magnéticos
      gsap.utils.toArray<HTMLElement>('.notfound-magnetic').forEach((button) => {
        const handleMove = (e: MouseEvent) => {
          const b = button.getBoundingClientRect();
          const x = ((e.clientX - b.left) / b.width - 0.5) * 16;
          const y = ((e.clientY - b.top) / b.height - 0.5) * 16;
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
    removeMagneticListeners.forEach((fn) => fn());
    ctx?.revert();
  });
</script>

<slot />
