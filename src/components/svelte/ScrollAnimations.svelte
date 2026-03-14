<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  export let delay: number = 0;

  let ctx: gsap.Context;

  onMount(() => {
    // We add a tiny delay to ensure Astro has mounted DOM elements
    setTimeout(() => {
      ctx = gsap.context(() => {
        const revealElements = document.querySelectorAll('.gsap-reveal');
        revealElements.forEach((el) => {
          let customDelay = delay;
          if (el.hasAttribute('data-gsap-delay')) {
            customDelay = parseFloat(el.getAttribute('data-gsap-delay') || '0');
          }

          gsap.fromTo(el, 
            { opacity: 0, y: 50 }, 
            {
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              },
              opacity: 1, 
              y: 0, 
              duration: 1.2, 
              ease: 'power3.out',
              delay: customDelay
            }
          );
        });

        // Hero immediate reveal
        const heroRevealElements = document.querySelectorAll('.gsap-hero-reveal');
        if (heroRevealElements.length > 0) {
          gsap.fromTo(heroRevealElements,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
          );
        }

        // Parallax effects
        const parallaxBg = document.querySelectorAll('.gsap-parallax');
        parallaxBg.forEach((el) => {
          gsap.to(el, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        });
      });
    }, 100);
  });

  onDestroy(() => {
    if (ctx) ctx.revert();
  });
</script>

<slot />
