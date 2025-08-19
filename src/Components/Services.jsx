import React from 'react';
import { useEffect, useRef } from 'react';

// Animation Libraries
import { gsap } from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Icons from Lucide React
import {
    Code2,
    TerminalSquare,
    LineChart,
    Paintbrush,
    LayoutTemplate,
    BarChart3,
    Search, // Added Search icon for SEO
    PenSquare,
    Printer,
} from 'lucide-react';


// --- Main Services Page Component ---
export default function Services() {
    const cursorGlowRef = useRef(null);
    const mainRef = useRef(null);

    // List of your services with details and icons
    const services = [
        {
            title: "Web Development",
            description: "Building bespoke, high-performance websites and web applications tailored to your unique business needs.",
            icon: <Code2 size={36} className="text-yellow-400" />,
        },
        {
            title: "Software Development",
            description: "Creating robust and scalable custom software solutions to streamline your operations and drive efficiency.",
            icon: <TerminalSquare size={36} className="text-yellow-400" />,
        },
        {
            title: "Digital Marketing",
            description: "Leveraging data-driven strategies across SEO, PPC, and social media to amplify your online presence.",
            icon: <LineChart size={36} className="text-yellow-400" />,
        },
        {
            title: "Graphic Design",
            description: "Creating intuitive and visually stunning user interfaces that deliver exceptional user experiences.",
            icon: <Paintbrush size={36} className="text-yellow-400" />,
        },
         {
            title: "Web Designing",
            description: "Designing modern, user-friendly web layouts that are both aesthetically pleasing and highly functional.",
            icon: <LayoutTemplate size={36} className="text-yellow-400" />,
        },
        {
            title: "Business Analyst",
            description: "Analyzing business needs and data to provide strategic insights and bridge the gap with technology.",
            icon: <BarChart3 size={36} className="text-yellow-400" />,
        },
        {
            title: "SEO",
            description: "Optimizing your website to rank higher on search engines and drive organic traffic.",
            icon: <Search size={36} className="text-yellow-400" />,
        },
        {
            title: "Content Writing",
            description: "Crafting compelling and SEO-optimized content that engages your audience and builds brand authority.",
            icon: <PenSquare size={36} className="text-yellow-400" />,
        },
        {
            title: "Print Media",
            description: "Designing high-impact print materials, from brochures to banners, that make a lasting impression.",
            icon: <Printer size={36} className="text-yellow-400" />,
        },
    ];

    
    const getAosAnimation = (index) => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            return "fade-up"; // On mobile and tablet, everything fades up
        }

        // On desktop, create a more dynamic staggered effect
        const pattern = index % 6;
        switch (pattern) {
            case 0: return "fade-right";
            case 1: return "fade-up";
            case 2: return "fade-left";
            case 3: return "fade-right";
            case 4: return "fade-up";
            case 5: return "fade-left";
            default: return "fade-up";
        }
    };

    useEffect(() => {
        // --- Initialize AOS (Animate on Scroll) ---
        AOS.init({
            duration: 800,   // Animation duration
            once: true,        // Animate only once
            offset: 120,       // Trigger animation when element is 120px into view
        });

        // --- GSAP Cursor Following Glow ---
        const cursorGlow = cursorGlowRef.current;
        if (!cursorGlow) return;

        const mouseMoveHandler = (e) => {
            gsap.to(cursorGlow, {
                duration: 0.7,
                x: e.clientX,
                y: e.clientY,
                ease: 'power3.out',
            });
        };
        
        // We only add this effect on non-touch devices for better performance
        if (window.matchMedia('(pointer: fine)').matches) {
            window.addEventListener('mousemove', mouseMoveHandler);
        }

        // --- Interactive Card Glow Effect ---
        const cards = document.querySelectorAll('.service-card');
        const handleCardMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleCardMouseMove);
        });

        // Cleanup function to remove event listeners
        return () => {
             if (window.matchMedia('(pointer: fine)').matches) {
                window.removeEventListener('mousemove', mouseMoveHandler);
            }
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleCardMouseMove);
            });
        };
    }, []);

    const customStyles = `
        body {
            overflow-x: hidden;
        }
        .service-card {
            --mouse-x: 50%;
            --mouse-y: 50%;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div ref={mainRef} className="bg-black min-h-screen w-full font-sans relative">
                {/* 1. GSAP Cursor Following Glow - A large, soft glow that follows the mouse */}
                <div
                    ref={cursorGlowRef}
                    className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] rounded-full z-0 hidden lg:block"
                    style={{
                        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 60%)',
                        transform: 'translate(-50%, -50%)',
                        willChange: 'transform',
                    }}
                />

                {/* 2. Main Content Container */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 data-aos="fade-up" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                            Our Comprehensive Services
                        </h1>
                        <p data-aos="fade-up" data-aos-delay="200" className="mt-6 text-lg text-gray-400">
                            We deliver a full spectrum of digital, creative, and technological solutions designed to elevate your brand and drive success.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                data-aos={getAosAnimation(index)}
                                data-aos-delay={100 * (index % 3)}
                                className="service-card group relative p-8 rounded-2xl overflow-hidden
                                           border border-yellow-500/20
                                           bg-gray-900/40 backdrop-blur-md
                                           transition-all duration-500 hover:border-yellow-500/80 hover:scale-[1.02]"
                            >
                                {/* Interactive Hover Glow - a spotlight that follows the mouse inside the card */}
                                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 
                                              group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(250, 204, 21, 0.15), transparent 80%)`,
                                    }}
                                />
                                
                                {/* Icon */}
                                <div className="mb-6">{service.icon}</div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
