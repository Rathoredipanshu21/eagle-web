import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Capital = () => {
  const capitalContainerRef = useRef(null);
  const capitalGlowRef = useRef(null);
  const capitalCanvasRef = useRef(null);
  const capitalTitleRef = useRef(null);
  const capitalSubtitleRef = useRef(null);

  useEffect(() => {
    const container = capitalContainerRef.current;
    const glow = capitalGlowRef.current;
    const canvas = capitalCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // --- CURSOR GLOW ---
    gsap.set(glow, { xPercent: -50, yPercent: -50 });
    const handleMouseMove = (e) => {
      gsap.to(glow, {
        duration: 0.6,
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out",
      });
    };
    container.addEventListener("mousemove", handleMouseMove);

    // --- CANVAS PARTICLES ---
    let particles = [];
    const particleCount = 100;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
      }
      draw() {
        ctx.fillStyle = "rgba(254, 240, 138, 0.9)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = Math.sqrt(
            (particles[a].x - particles[b].x) ** 2 +
              (particles[a].y - particles[b].y) ** 2
          );
          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(254, 240, 138, ${opacity * 0.6})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    animateParticles();
    window.addEventListener("resize", resizeCanvas);

    // --- TEXT ANIMATIONS ---
    const splitText = (elem) => {
      const chars = elem.innerText.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        return span;
      });
      elem.innerHTML = "";
      elem.append(...chars);
      return chars;
    };

    const titleChars = splitText(capitalTitleRef.current);
    const subtitleChars = splitText(capitalSubtitleRef.current);

    const tl = gsap.timeline();

    tl.from(titleChars, {
      duration: 1.2,
      opacity: 0,
      y: 80,
      rotateX: -90,
      stagger: 0.03,
      ease: "power3.out",
    })
      .to(titleChars, {
        duration: 0.6,
        opacity: 1, // FIX: Set final opacity to 1 for solid text
        ease: "sine.inOut",
      })
      .from(
        subtitleChars,
        {
          duration: 1.2,
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=1"
      )
      .to(subtitleChars, {
        duration: 0.6,
        opacity: 1, // FIX: Set final opacity to 1 for solid text
        ease: "sine.inOut",
      })
      .from(
        ".capital-content-section > *",
        {
          duration: 1.5,
          opacity: 0,
          x: 50,
          stagger: 0.2,
          ease: "expo.out",
        },
        "-=0.8"
      );

    // --- CLEANUP ---
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={capitalContainerRef}
      className="capital-container bg-black text-white min-h-screen w-full overflow-hidden relative font-sans flex items-center justify-center p-4"
    >
      {/* Canvas behind everything */}
      <canvas
        ref={capitalCanvasRef}
        className="capital-canvas absolute top-0 left-0 w-full h-full z-[-1]"
      ></canvas>

      {/* Cursor Glow */}
      <div
        ref={capitalGlowRef}
        className="capital-glow pointer-events-none absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full z-10"
        style={{
          filter: "blur(150px)",
          opacity: 0.25,
        }}
      ></div>

      {/* Content */}
      <div className="capital-grid-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto z-20">
        <div className="capital-title-section text-center md:text-left">
          <h1
            ref={capitalTitleRef}
            className="capital-title-main text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white"
            style={{
              perspective: 400,
              textShadow:
                "0 0 10px rgba(254, 240, 138, 0.7), 0 0 25px rgba(250, 204, 21, 0.5)",
            }}
          >
            Our Work
          </h1>
          <h2
            ref={capitalSubtitleRef}
            className="capital-title-sub text-6xl md:text-8xl font-bold tracking-tighter text-white"
            style={{
              perspective: 400,
              textShadow:
                "0 0 10px rgba(254, 240, 138, 0.7), 0 0 25px rgba(250, 204, 21, 0.5)",
            }}
          >
            Your Success
          </h2>
        </div>

        {/* FIX: Increased background opacity and adjusted text styling for readability */}
        <div className="capital-content-section space-y-6 text-white relative p-6 rounded-xl  backdrop-blur-md shadow-lg">
          <h3
            className="capital-content-header text-3xl font-semibold"
            style={{ textShadow: "0 0 15px rgba(254, 240, 138, 0.5)" }}
          >
            Empowering Your Vision with Cutting-Edge IT Solutions.
          </h3>
          {/* FIX: Removed ineffective text shadow */}
          <p className="capital-content-paragraph text-lg leading-relaxed">
            We provide a comprehensive suite of IT services designed to elevate
            your business. From cloud infrastructure and cybersecurity to
            bespoke software development, we are the architects of your digital
            transformation.
          </p>
          {/* FIX: Removed ineffective text shadow */}
          <p className="capital-content-paragraph text-lg leading-relaxed">
            Our expert team partners with you to understand your unique
            challenges and goals. We leverage the latest technologies to build
            robust, scalable, and secure systems that drive growth and
            efficiency, ensuring you stay ahead in a competitive market.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Capital;