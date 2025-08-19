// HorizontalScroll.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HorizontalScroll() {
  const mainRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textElement = textRef.current;

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: () => "+=" + (textElement.scrollWidth - window.innerWidth),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // fixes resize issues
        },
      });

      tl.to(textElement, {
        x: () => -(textElement.scrollWidth - window.innerWidth),
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert(); // ✅ React-friendly cleanup
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-screen bg-gray-900 text-white font-sans overflow-hidden flex items-center"
    >
      <div className="w-full">
        <div
          ref={textRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter whitespace-nowrap"
        >
          <span className="text-gray-500 px-4 md:px-8 lg:px-10">
            Eagle Web • IT Services & Consulting •
          </span>
          <span
            className="text-yellow-400 px-4 md:px-8 lg:px-10"
            style={{
              filter:
                "drop-shadow(0 0 15px rgba(250, 204, 21, 0.5))",
            }}
          >
            We don't just build websites, we build from your vision.
          </span>
          <span className="text-gray-500 px-4 md:px-8 lg:px-10">
            Engineering digital experiences through the customer's eyes.
          </span>
        </div>
      </div>
    </main>
  );
}

export default HorizontalScroll;
