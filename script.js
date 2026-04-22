gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  gsap.from(".hero-title", {
    y: 90,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    stagger: 0.16,
  });

  gsap.from(".hero-sub", {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    delay: 0.55,
  });

  gsap.to(".hero-drone", {
    y: "+=14",
    rotation: 1.6,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".hero-drone", {
    y: 90,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "+=900",
      scrub: true,
    },
  });
}

if (!prefersReducedMotion) {
  gsap.utils.toArray(".fade-up").forEach((item) => {
    gsap.from(item, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
    });
  });

  gsap.utils.toArray(".reveal-card").forEach((card, index) => {
    gsap.from(card, {
      y: 55,
      opacity: 0,
      rotateX: 8,
      duration: 0.9,
      ease: "power3.out",
      delay: index * 0.08,
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
      },
    });
  });

  gsap.utils.toArray(".stat-number").forEach((counter) => {
    const target = Number(counter.getAttribute("data-target")) || 0;
    const data = { value: 0 };

    gsap.to(data, {
      value: target,
      duration: 1.6,
      ease: "power2.out",
      snap: { value: 1 },
      onUpdate: () => {
        counter.textContent = String(data.value);
      },
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        once: true,
      },
    });
  });

  const hSection = document.querySelector(".h-section");
  const hTrack = document.querySelector(".h-track");

  if (hSection && hTrack) {
    const panels = gsap.utils.toArray(".panel");

    gsap.to(hTrack, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: hSection,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + (hTrack.scrollWidth - window.innerWidth),
      },
    });
  }
} else {
  gsap.utils.toArray(".stat-number").forEach((counter) => {
    const target = Number(counter.getAttribute("data-target")) || 0;
    counter.textContent = String(target);
  });
}
