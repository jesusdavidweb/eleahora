import type { gsap } from 'gsap';

export function revealFromBottom(
  gsapInstance: typeof gsap,
  selector: string,
  stagger = 0.08,
  offset = 60
) {
  const elements = gsapInstance.utils.toArray<HTMLElement>(selector);

  elements.forEach((element, index) => {
    gsapInstance.fromTo(
      element,
      { opacity: 0, y: offset },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}
