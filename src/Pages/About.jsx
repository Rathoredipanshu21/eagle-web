import React, { useLayoutEffect, useRef } from 'react';
import {
    Code,
    Server,
    Share2,
    Palette,
    Linkedin,
    Twitter,
    Github,
    Megaphone,
    PenTool,
    Monitor,
    Briefcase,
    Headphones,
    Type,
    Printer,
    Film,
    Presentation,
} from 'lucide-react';

// --- IMPORTANT SETUP ---
// This component uses Tailwind CSS for styling.
// Make sure you have Tailwind CSS set up in your project.
//
// This component relies on GSAP, AOS, and their related plugins.
// Please ensure you include these script/link tags in your `public/index.html` file, inside the `<head>` section:
//
// <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
// <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>


// --- SVG Icon Components ---
const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);


// --- Star Component for Hero Section ---
const Star = ({ size, left, top }) => (
  <div
    className="floating-star absolute rounded-full bg-yellow-400"
    style={{
      width: `${size}px`, height: `${size}px`, left: `${left}%`, top: `${top}%`,
      boxShadow: `0 0 ${size * 2}px ${size * 0.5}px rgba(250, 204, 21, 0.7)`,
    }}
  ></div>
);


// --- Main App Component ---
export default function App() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    // --- Initialize AOS ---
    // This assumes the AOS script is loaded globally from your index.html
    if (window.AOS) {
        window.AOS.init({
            duration: 1000, // values from 0 to 3000, with step 50ms
            once: true, // whether animation should happen only once - while scrolling down
        });
    } else {
        console.error("AOS library not found. Please ensure the AOS script tag is in your index.html.");
    }


    const gsap = window.gsap;
    if (!gsap || !gsap.ScrollTrigger) {
      console.error("GSAP or ScrollTrigger not found. Please ensure the GSAP library and ScrollTrigger plugin are loaded.");
      return;
    }

    gsap.registerPlugin(gsap.ScrollTrigger);

    let handleMouseMove;

    const ctx = gsap.context(() => {
      // --- HERO: Parallax Mouse Move Effect ---
      const parallaxElements = gsap.utils.toArray('.floating-element, .floating-star');
      handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const xPercent = clientX / window.innerWidth - 0.5;
        const yPercent = clientY / window.innerHeight - 0.5;

        gsap.to(".cursor-light", {
          '--x': `${clientX}px`,
          '--y': `${clientY}px`,
          duration: 0.6,
          ease: 'power2.out',
        });

        parallaxElements.forEach(el => {
          const depth = parseFloat(el.dataset.depth || 0);
          const rotateX = yPercent * depth * -50;
          const rotateY = xPercent * depth * 50;
          gsap.to(el, {
            rotationX: rotateX,
            rotationY: rotateY,
            z: Math.abs(xPercent * depth * 100),
            duration: 1.2,
            ease: 'power3.out',
          });
        });
      };
      document.addEventListener('mousemove', handleMouseMove);


      // --- HERO: Floating Animation for Icons & Stars ---
      parallaxElements.forEach(el => {
        const isStar = el.classList.contains('floating-star');
        el.dataset.depth = Math.random() * 0.4 + 0.1;
        gsap.to(el, {
          x: `random(-250, 250)`,
          y: `random(-250, 250)`,
          duration: 'random(10, 20)',
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });
        if (isStar) {
          gsap.to(el, {
            opacity: 'random(0.3, 1)', scale: 'random(0.8, 1.2)',
            duration: 'random(2, 4)', ease: 'power1.inOut',
            repeat: -1, yoyo: true,
          });
        }
      });

      // --- HERO: Character-by-Character Text Animation ---
      const heroText = gsap.utils.toArray('.hero-text');
      heroText.forEach(text => {
        const chars = text.textContent.split(''); text.textContent = '';
        chars.forEach(char => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.className = 'char inline-block'; text.appendChild(span);
        });
      });
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('.char', {
        y: 80, opacity: 0, skewX: 45, filter: 'blur(10px)',
        stagger: 0.04, duration: 1.2, ease: 'power4.out',
      })
      .from(".sub-text", {
        y: 40, opacity: 0, filter: 'blur(5px)',
        duration: 1, ease: 'power3.out',
      }, "-=1")
      .from(".scroll-indicator", {
        opacity: 0, y: 20,
        duration: 0.8, ease: "power2.out",
      }, "-=0.5");

      // --- JOURNEY SECTION: Pinning Animation ---
      ScrollTrigger.create({
        trigger: '.journey-section-container',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.journey-left-panel',
        scrub: 1,
      });
      
      // --- TEAM SECTION: Card Hover Animation ---
      document.querySelectorAll('.team-member-card').forEach(card => {
        const socialIcons = card.querySelector('.team-social-links');
        gsap.set(socialIcons, { y: 20, opacity: 0 });
        card.addEventListener('mouseenter', () => {
          gsap.to(card.querySelector('img'), { scale: 1.05, duration: 0.4, ease: 'power3.out' });
          gsap.to(socialIcons, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card.querySelector('img'), { scale: 1, duration: 0.4, ease: 'power3.out' });
          gsap.to(socialIcons, { y: 20, opacity: 0, duration: 0.4, ease: 'power3.out' });
        });
      });


    }, comp);

    return () => {
      if (handleMouseMove) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  // --- Data for Page Content ---
  const techIcons = ['React', 'Node.js', 'Python', 'Go', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'PostgreSQL', 'MongoDB'];
  const stars = [
    { size: 3, left: 10, top: 20 }, { size: 2, left: 80, top: 30 }, { size: 4, left: 90, top: 70 },
    { size: 2, left: 25, top: 85 }, { size: 3, left: 5, top: 60 }, { size: 2, left: 50, top: 10 },
    { size: 3, left: 70, top: 90 }, { size: 2, left: 30, top: 40 }, { size: 3, left: 95, top: 5 },
  ];
  const journeyMilestones = [
      { year: '2018 - The Foundation', text: 'Born as a dynamic marketing agency, we mastered the art of brand storytelling, connecting with audiences through digital marketing, graphic design, and compelling content.' },
      { year: '2020 - The Pivot', text: 'We saw the future. Our clients needed more than just marketing; they needed integrated digital solutions. We began building our in-house tech team, laying the groundwork for what was to come.' },
      { year: '2023 - The Transformation', text: 'A strong move. We officially relaunched as a full-fledged IT industry leader, shifting our core focus to web development, custom software, and advanced social media engineering.' },
      { year: 'Today - The Future', text: 'We are architects of the digital world. We leverage our unique blend of marketing DNA and technical expertise to build solutions that are not only functional but also deeply human-centric.' },
  ];
  const oldServices = [ 
    { name: 'Digital Marketing', icon: <Megaphone size={28} /> },
    { name: 'Graphic Design', icon: <PenTool size={28} /> },
    { name: 'Web Designing', icon: <Monitor size={28} /> },
    { name: 'Business Analyst', icon: <Briefcase size={28} /> },
    { name: 'BPO Service', icon: <Headphones size={28} /> },
    { name: 'Content Writing', icon: <Type size={28} /> },
    { name: 'Print Media', icon: <Printer size={28} /> },
    { name: 'Ad Films', icon: <Film size={28} /> },
    { name: 'PPT', icon: <Presentation size={28} /> },
  ];
  const newServices = [
    { name: 'Web Development', description: 'Building robust, scalable, and secure web applications tailored to your business needs.', icon: <Code size={40} className="text-yellow-400" /> },
    { name: 'Software Solutions', description: 'Developing custom software that streamlines operations and drives growth.', icon: <Server size={40} className="text-yellow-400" /> },
    { name: 'Social Media Strategy', description: 'Crafting data-driven social media campaigns that engage and convert your audience.', icon: <Share2 size={40} className="text-yellow-400" /> },
    { name: 'UI/UX & Branding', description: 'Designing intuitive interfaces and memorable brand identities that captivate users.', icon: <Palette size={40} className="text-yellow-400" /> },
  ];
  const teamMembers = [
    { name: 'Alex Johnson', role: 'Lead Architect', img: 'https://placehold.co/400x400/1a1a1a/FBBF24?text=AJ' },
    { name: 'Maria Garcia', role: 'Creative Director (UI/UX)', img: 'https://placehold.co/400x400/1a1a1a/FBBF24?text=MG' },
    { name: 'Sam Chen', role: 'Head of Engineering', img: 'https://placehold.co/400x400/1a1a1a/FBBF24?text=SC' },
  ];

  // --- ClassNames for new styles ---
  const serviceEvolutionCardStarted = "bg-[#272a35] p-4 rounded-lg flex flex-col items-center justify-center gap-3 text-center text-gray-300 transition-colors hover:bg-[#3a3e4d]";
  const serviceEvolutionCardNow = "flex items-start space-x-6 p-6 bg-[#111827] rounded-lg shadow-lg";
  const digitaEdgeCard = "p-8 bg-[#111827] rounded-xl border border-gray-800 shadow-2xl flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 hover:border-yellow-400";


  return (
    <div ref={comp} className="about-container bg-black text-white overflow-x-hidden font-sans">

      <div
        className="cursor-light fixed inset-0 pointer-events-none z-50"
        style={{
          '--x': '50vw', '--y': '50vh',
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(250, 204, 21, 0.3), transparent 40vw)'
        }}
      ></div>

      {/* --- Section 1: Hero --- */}
      <section className="hero-section relative w-full h-screen flex flex-col justify-center items-center text-center p-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(250, 204, 21, 0.20), transparent 70%)'
          }}
        ></div>

        <div className="absolute inset-0 w-full h-full" style={{ perspective: '1200px' }}>
          {techIcons.map((tech, i) => (
            <div
              key={`tech-${i}`}
              className="floating-element absolute text-gray-400 border border-gray-800 rounded-lg px-4 py-2 text-lg font-mono bg-black/50 backdrop-blur-sm opacity-40"
              style={{
                top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {tech}
            </div>
          ))}
          {stars.map((star, i) => <Star key={`star-${i}`} {...star} />)}
        </div>

        <div className="relative z-10" data-aos="fade-up">
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-100">
            About Our Mission.
          </h1>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-yellow-400 mt-1">
            Crafting Digital Excellence.
          </h1>
          <p className="sub-text max-w-3xl mx-auto mt-4 text-base md:text-lg text-gray-300">
            We are a collective of thinkers, creators, and innovators dedicated to pushing the boundaries of technology and design.
          </p>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        </div>
      </section>

      <main className="main-content relative z-10 py-20 px-4 md:px-8 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">

            {/* --- Section 2: Our Journey --- */}
            <section className="journey-section-container relative flex flex-col lg:flex-row mb-24" data-aos="fade-up">
              <div className="journey-left-panel lg:w-1/3 lg:h-screen lg:sticky top-0 flex flex-col justify-center p-8" data-aos="fade-right" data-aos-delay="200">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-yellow-400">Our <br />Evolution.</h2>
                <p className="mt-6 text-gray-300">
                  A timeline of our transformation from a creative marketing agency to a full-stack technology partner.
                </p>
              </div>
              <div className="journey-right-panel lg:w-2/3 mt-12 lg:mt-0" data-aos="fade-left" data-aos-delay="200">
                <div className="space-y-16">
                    {journeyMilestones.map((item, index) => (
                        <div key={index} className="milestone-item p-6 border-l-2 border-yellow-400" data-aos="fade-up" data-aos-delay={index * 150}>
                            <h3 className="milestone-year text-yellow-400 text-2xl font-semibold">{item.year}</h3>
                            <p className="milestone-text mt-4 text-gray-300">{item.text}</p>
                        </div>
                    ))}
                </div>
              </div>
            </section>
            
            {/* --- Section 3: Then vs Now --- */}
            <section className="bg-[#0b0f19] py-20 my-24 rounded-lg" data-aos="fade-up">
                <div className="text-center mb-16 px-4" data-aos="fade-up">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Our Service Evolution</h2>
                  <p className="mt-4 text-gray-400 max-w-2xl mx-auto">From a broad marketing spectrum to a deep technological focus.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start px-8">
                  <div data-aos="fade-right" data-aos-delay="200">
                    <h3 className="text-2xl font-semibold text-center text-gray-200 mb-8">Where We Started</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {oldServices.map((service, index) => (
                        <div key={service.name} className={serviceEvolutionCardStarted} data-aos="fade-up" data-aos-delay={index * 50}>
                          {service.icon}
                          <p className="font-medium text-sm">{service.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div data-aos="fade-left" data-aos-delay="200">
                    <h3 className="text-2xl font-semibold text-center text-yellow-400 mb-8">Where We Are Now</h3>
                    <div className="space-y-8">
                      {newServices.slice(0, 2).map((service, index) => (
                        <div key={service.name} className={serviceEvolutionCardNow} data-aos="fade-up" data-aos-delay={index * 100}>
                          <div className="flex-shrink-0 mt-1">{service.icon}</div>
                          <div>
                            <h4 className="text-xl font-bold text-white">{service.name}</h4>
                            <p className="mt-2 text-gray-400">{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </section>
            
            {/* --- Section 4: The Digita Evo Edge --- */}
            <section className="text-center my-24" data-aos="fade-up">
                <h2 className="text-4xl md:text-5xl font-bold text-white">The Digita Evo Edge</h2>
                <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
                    Our marketing past isn't just history; it's our strategic advantage. We don't just write code, we build experiences that resonate.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {newServices.map((service, index) => (
                        <div key={service.name} className={digitaEdgeCard} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="mb-6">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-white">{service.name}</h3>
                            <p className="text-gray-400 flex-grow">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section 5: Our Proven Process --- */}
            <section className="my-24" data-aos="fade-up">
                 <h2 className="text-4xl font-bold text-yellow-400 mb-12 text-center">Our Proven Process</h2>
                 <div className="relative">
                   <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2"></div>
                   <div className="grid md:grid-cols-3 gap-16 relative">
                       <div className="text-center p-6 border border-gray-800 rounded-lg bg-black" data-aos="fade-up" data-aos-delay="100">
                           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-400/20 rounded-full border-2 border-yellow-400">
                               <span className="text-2xl font-bold text-yellow-400">1</span>
                           </div>
                           <h3 className="text-2xl font-bold mb-2">Discovery</h3>
                           <p className="text-gray-400">We start by understanding your vision, goals, and challenges to lay a solid foundation.</p>
                       </div>
                       <div className="text-center p-6 border border-gray-800 rounded-lg bg-black" data-aos="fade-up" data-aos-delay="250">
                           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-400/20 rounded-full border-2 border-yellow-400">
                               <span className="text-2xl font-bold text-yellow-400">2</span>
                           </div>
                           <h3 className="text-2xl font-bold mb-2">Design & Build</h3>
                           <p className="text-gray-400">Our team crafts intuitive designs and writes clean, efficient code to bring your ideas to life.</p>
                       </div>
                       <div className="text-center p-6 border border-gray-800 rounded-lg bg-black" data-aos="fade-up" data-aos-delay="400">
                           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-400/20 rounded-full border-2 border-yellow-400">
                               <span className="text-2xl font-bold text-yellow-400">3</span>
                           </div>
                           <h3 className="text-2xl font-bold mb-2">Deploy & Scale</h3>
                           <p className="text-gray-400">We ensure a seamless launch and provide ongoing support to help you grow.</p>
                       </div>
                   </div>
                 </div>
           </section>
            
            {/* --- Section 6: Meet the Visionaries (Team) --- */}
            <section className="my-24" data-aos="fade-up">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">Meet the Visionaries</h2>
                <p className="mt-4 text-gray-300 max-w-2xl mx-auto">The architects and strategists leading our technological charge.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
                {teamMembers.map((member, index) => (
                  <div key={member.name} className="team-member-card relative overflow-hidden rounded-lg group" data-aos="fade-up" data-aos-delay={index * 100}>
                    <img src={member.img} alt={member.name} className="w-full h-auto object-cover transition-transform duration-400 ease-in-out transform"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-yellow-400">{member.role}</p>
                      <div className="team-social-links mt-4 flex space-x-3">
                        <a href="#" className="text-gray-400 hover:text-yellow-400"><Linkedin size={20}/></a>
                        <a href="#" className="text-gray-400 hover:text-yellow-400"><Twitter size={20}/></a>
                        <a href="#" className="text-gray-400 hover:text-yellow-400"><Github size={20}/></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- Section 7: Join Us (CTA) --- */}
            <section className="text-center bg-gray-900/50 border border-gray-800 rounded-lg p-12 mt-24" data-aos="zoom-in-up">
               <TargetIcon className="w-16 h-16 text-yellow-400 mx-auto mb-6"/>
               <h2 className="text-4xl font-bold text-white mb-4">Ready to Build the Future?</h2>
               <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                 Let's collaborate on your next project. We're excited to hear your ideas and explore how we can help you achieve your goals.
               </p>
               <button className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105">
                 Contact Us
               </button>
            </section>

        </div>
      </main>
    </div>
  );
}
