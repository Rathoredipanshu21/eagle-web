import React, { useEffect, useRef } from 'react';

// Animation Libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Icons from Lucide React
import {
    Target, Megaphone, Search, LineChart as LineChartIcon, Users, Mail, Palette, BarChart3, BrainCircuit,
    Type, Code, Server, Smartphone, Rocket, Newspaper, ArrowRight, Layers, PenTool
} from 'lucide-react';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LongScrollablePage() {
    const longScrollableContainerRef = useRef(null);
    const cursorGlowRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Slightly faster for better feel on mobile
            once: true,
            offset: 100, // Adjust offset for mobile viewing
        });

        const cursorGlow = cursorGlowRef.current;
        const mouseMoveHandler = (e) => {
            gsap.to(cursorGlow, {
                duration: 0.7,
                x: e.clientX,
                y: e.clientY,
                ease: 'power3.out',
            });
        };
        if (window.matchMedia('(pointer: fine)').matches) {
            window.addEventListener('mousemove', mouseMoveHandler);
        }

        const context = gsap.context(() => {
            // --- Hero Section Animation ---
            gsap.timeline()
                .from('.longscrollable-header-title span', {
                    duration: 1,
                    y: 100,
                    opacity: 0,
                    stagger: 0.05,
                    ease: 'power3.out',
                    delay: 0.2
                })
                .from('.longscrollable-header-subtitle', {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power3.out'
                }, "-=0.5");

            // --- Responsive GSAP Animations with MatchMedia ---
            ScrollTrigger.matchMedia({
                // Desktop-only animations
                "(min-width: 768px)": function() {
                    // --- SEO Section Pin & Wipe ---
                    const seoPanels = gsap.utils.toArray(".seo-panel");
                    if (seoPanels.length > 0) {
                        gsap.to(seoPanels, {
                            xPercent: -100 * (seoPanels.length - 1),
                            ease: "none",
                            scrollTrigger: {
                                trigger: ".seo-horizontal-container",
                                pin: true,
                                scrub: 1,
                                snap: 1 / (seoPanels.length - 1),
                                end: () => "+=" + document.querySelector(".seo-horizontal-container").offsetWidth
                            }
                        });
                    }
                },
                // Mobile-specific adjustments (or lack of complex animations)
                "(max-width: 767px)": function() {
                    // On mobile, the horizontal scroll section will just stack vertically.
                    // No special JS is needed for that, just CSS.
                }
            });

            // --- Web Development Timeline Animation (works on all screen sizes) ---
            const wdItems = gsap.utils.toArray('.wd-timeline-item');
            wdItems.forEach(item => {
                gsap.from(item.querySelector('.wd-timeline-content'), {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%', // Trigger a bit earlier on scroll
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    x: -30,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                 gsap.from(item.querySelector('.wd-timeline-icon'), {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    scale: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.75)'
                });
            });

        }, longScrollableContainerRef);

        return () => {
            if (window.matchMedia('(pointer: fine)').matches) {
                window.removeEventListener('mousemove', mouseMoveHandler);
            }
            context.revert();
            ScrollTrigger.killAll();
        };
    }, []);

    const customStyles = `
        html, body {
            overflow-x: hidden; /* This is the key for preventing horizontal scroll */
        }
        .longscrollable-container {
            width: 100%;
        }
        .longscrollable-glowing-text {
            text-shadow: 0 0 12px rgba(250, 204, 21, 0.8);
        }
        /* Desktop horizontal scroll setup */
        @media (min-width: 768px) {
            .seo-horizontal-container {
                width: 300%; /* 100% for each of the 3 panels */
                height: 100vh;
                display: flex;
                flex-wrap: nowrap;
            }
            .seo-panel {
                width: 100%;
                height: 100vh;
            }
        }
        /* Mobile vertical stacking setup */
        @media (max-width: 767px) {
            #seo {
                height: auto; /* Allow section to grow */
            }
            .seo-horizontal-container {
                display: block; /* Stack panels vertically */
                width: 100%;
                height: auto;
            }
            .seo-panel {
                width: 100%;
                height: auto; /* Adjust height for content */
                min-height: 80vh; /* Ensure it's not too small */
            }
        }
        .wd-timeline-line {
            width: 2px;
            background-image: linear-gradient(to bottom, #facc15 2px, transparent 2px);
            background-size: 100% 10px;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div ref={longScrollableContainerRef} className="longscrollable-container bg-black font-sans text-white w-full">
                <div ref={cursorGlowRef} className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full z-[9999] hidden lg:block" style={{ background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', willChange: 'transform' }} />

                <header className="longscrollable-header relative z-10 min-h-screen flex flex-col justify-center items-center text-center p-4">
                    <h1 className="longscrollable-header-title text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter longscrollable-glowing-text">
                        {"Our Digital Expertise".split("").map((char, index) => <span key={index} className="inline-block">{char === " " ? "\u00A0" : char}</span>)}
                    </h1>
                    <p className="longscrollable-header-subtitle max-w-lg md:max-w-3xl mt-6 text-base md:text-xl text-gray-300">
                        A deep dive into the modern strategies and technologies we use to build powerful brands and drive measurable growth.
                    </p>
                </header>

                <main className="longscrollable-main-content relative z-10">
                    
                    {/* --- 1. Digital Marketing Section --- */}
                    <section id="digital-marketing" className="longscrollable-section longscrollable-section-dm py-20 md:py-32 overflow-hidden">
                        <div className="container mx-auto px-6">
                            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                                <div className="text-left">
                                    <Megaphone size={40} className="text-yellow-400 mb-4" data-aos="fade-down" />
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-right">Digital Marketing</h2>
                                    <p className="text-gray-300 mb-8" data-aos="fade-right" data-aos-delay="200">
                                        We craft comprehensive, data-driven marketing strategies that connect you with your audience. Our approach is holistic, covering everything from initial brand awareness to customer loyalty and advocacy. We turn engagement into revenue.
                                    </p>
                                    <div className="space-y-6">
                                        <div data-aos="fade-up" data-aos-delay="300">
                                            <h3 className="text-xl font-bold flex items-center text-yellow-400"><Target className="mr-3" /> Paid Advertising & SMM</h3>
                                            <p className="text-gray-400 pl-8">Targeted PPC and social media campaigns that deliver measurable ROI and build brand presence.</p>
                                        </div>
                                        <div data-aos="fade-up" data-aos-delay="400">
                                            <h3 className="text-xl font-bold flex items-center text-yellow-400"><Mail className="mr-3" /> Email & CRM Automation</h3>
                                            <p className="text-gray-400 pl-8">Nurture leads and retain customers with personalized email funnels and automated workflows.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative h-80 md:h-96" data-aos="zoom-in-left">
                                    <img src="https://images.unsplash.com/photo-1590102425728-aa39769512ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWFya2V0aW5nJTIwU3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D" alt="Marketing Growth" className="absolute top-0 left-0 w-3/4 h-3/4 rounded-lg shadow-2xl object-cover"/>
                                    <img src="https://plus.unsplash.com/premium_photo-1661764570116-b1b0a2da783c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hcmtldGluZyUyMHN0cmF0ZWd5fGVufDB8fDB8fHww" alt="Marketing Strategy" className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-lg shadow-2xl object-cover border-4 border-black"/>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- 2. SEO Section --- */}
                    <section id="seo" className="longscrollable-section longscrollable-section-seo relative">
                         <div className="seo-horizontal-container">
                            <div className="seo-panel flex items-center justify-center p-6 md:p-10 bg-black">
                                <div className="text-center max-w-md md:max-w-3xl">
                                    <div className="relative inline-block" data-aos="zoom-in">
                                         <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-2xl"></div>
                                         <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto text-yellow-400 mb-6 relative"/>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold">Search Engine Optimization</h2>
                                    <p className="mt-4 text-lg md:text-xl text-gray-400">Climbing the search rankings to put your brand front and center.</p>
                                </div>
                            </div>
                            <div className="seo-panel flex items-center justify-center p-6 md:p-10 bg-gray-900">
                                <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                                    <img src="https://images.unsplash.com/photo-1599658880436-c61792e70672?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNlb3xlbnwwfHwwfHx8MA%3D%3D" alt="On-Page SEO" className="rounded-lg w-full"/>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-3">On-Page & Technical SEO</h3>
                                        <p className="text-base md:text-lg">We optimize your website's structure, content, and code. This includes keyword research, meta tag optimization, improving site speed, and ensuring mobile-friendliness.</p>
                                    </div>
                                </div>
                            </div>
                             <div className="seo-panel flex items-center justify-center p-6 md:p-10 bg-black">
                                <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                                    <div className="order-2 md:order-1">
                                        <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-3">Off-Page & Local SEO</h3>
                                        <p className="text-base md:text-lg">We build your site's authority through quality backlink strategies and manage your local business listings. This enhances your reputation and makes it easier for local customers to find you.</p>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VvfGVufDB8fDB8fHww" alt="Off-Page SEO" className="rounded-lg w-full order-1 md:order-2"/>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- 3. Website Development Section --- */}
                    <section id="web-development" className="longscrollable-section longscrollable-section-wd py-20 md:py-32 px-6 bg-gray-900">
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <Code size={48} className="mx-auto text-yellow-400 mb-4" data-aos="zoom-out" />
                            <h2 className="text-4xl md:text-5xl font-bold" data-aos="fade-up">Website Development</h2>
                            <p className="mt-4 text-gray-400" data-aos="fade-up" data-aos-delay="200">
                                Our collaborative process for building fast, secure, and intuitive websites.
                            </p>
                        </div>
                        <div className="max-w-md md:max-w-3xl mx-auto relative">
                           <div className="wd-timeline-line absolute top-0 bottom-0 left-5 h-full"></div>
                           <div className="wd-timeline-item relative flex items-start mb-12">
                               <div className="wd-timeline-icon bg-yellow-400 text-black rounded-full p-3 mr-4 md:mr-6 z-10"><BrainCircuit size={24}/></div>
                               <div className="wd-timeline-content">
                                   <h3 className="text-xl md:text-2xl font-bold">1. Discovery & UI/UX Design</h3>
                                   <p className="mt-2 text-gray-300">We start by understanding your vision, defining project scope, and creating intuitive wireframes and stunning visual designs.</p>
                               </div>
                           </div>
                           <div className="wd-timeline-item relative flex items-start mb-12">
                               <div className="wd-timeline-icon bg-yellow-400 text-black rounded-full p-3 mr-4 md:mr-6 z-10"><Smartphone size={24}/></div>
                               <div className="wd-timeline-content">
                                   <h3 className="text-xl md:text-2xl font-bold">2. Frontend Development</h3>
                                   <p className="mt-2 text-gray-300">Using modern tech like React, we bring designs to life with clean code for a responsive, interactive, and pixel-perfect interface.</p>
                               </div>
                           </div>
                           <div className="wd-timeline-item relative flex items-start">
                               <div className="wd-timeline-icon bg-yellow-400 text-black rounded-full p-3 mr-4 md:mr-6 z-10"><Rocket size={24}/></div>
                               <div className="wd-timeline-content">
                                   <h3 className="text-xl md:text-2xl font-bold">3. Backend & Deployment</h3>
                                   <p className="mt-2 text-gray-300">We build robust, secure, and scalable server-side logic and handle the entire deployment process for a smooth launch.</p>
                               </div>
                           </div>
                        </div>
                    </section>

                    {/* --- Other Services Sections --- */}
                    <section className="other-services-container py-20 md:py-32 px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                            <div data-aos="fade-up" className="bg-gray-900 p-8 rounded-lg flex flex-col items-center text-center">
                                <BarChart3 size={40} className="text-yellow-400 mb-4"/>
                                <h3 className="text-2xl font-bold mb-2">Business Analytics</h3>
                                <p className="text-gray-400">We transform raw data into actionable insights, helping you make smarter, data-backed decisions.</p>
                            </div>
                             <div data-aos="fade-up" data-aos-delay="100" className="bg-gray-900 p-8 rounded-lg flex flex-col items-center text-center">
                                <Palette size={40} className="text-yellow-400 mb-4"/>
                                <h3 className="text-2xl font-bold mb-2">Graphic Design</h3>
                                <p className="text-gray-400">From logos to complete brand identities, we create memorable visuals that are impactful and perfectly aligned.</p>
                            </div>
                             <div data-aos="fade-up" data-aos-delay="200" className="bg-gray-900 p-8 rounded-lg flex flex-col items-center text-center">
                                <Type size={40} className="text-yellow-400 mb-4"/>
                                <h3 className="text-2xl font-bold mb-2">Content Writing</h3>
                                <p className="text-gray-400">We write clear, persuasive, and SEO-friendly copy for your website, blog, and marketing campaigns.</p>
                            </div>
                             <div data-aos="fade-up" data-aos-delay="300" className="bg-gray-900 p-8 rounded-lg flex flex-col items-center text-center">
                                <Newspaper size={40} className="text-yellow-400 mb-4"/>
                                <h3 className="text-2xl font-bold mb-2">Print Media</h3>
                                <p className="text-gray-400">We design stunning brochures, business cards, and banners that elevate your brand's physical presence.</p>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </>
    );
}
