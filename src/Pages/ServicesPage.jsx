import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
// Note: GSAP and AOS are now loaded via script tags, not imports.
import {
    Code2, TerminalSquare, LineChart, Paintbrush, LayoutTemplate,
    BarChart3, Search, PenSquare, Printer, ArrowRight, CheckCircle2, Bot, Database, X,
    Wind, BrainCircuit, Target, PenTool, GitBranch, ShieldCheck, Award, Users, Coffee, ChevronDown, MessageSquare
} from 'lucide-react';

// --- DATA ARRAYS ---

const services = [
    {
        title: "Web Development",
        shortDescription: "Building bespoke, high-performance websites and web applications.",
        icon: <Code2 size={36} className="text-yellow-400" />,
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        detailedDescription: "Our Web Development service is the cornerstone of a powerful digital presence. We engineer digital experiences using modern frameworks like React and Vue for dynamic user interfaces, and robust backend technologies like Node.js and Python for scalable server-side logic. We build custom APIs, integrate third-party services, and ensure your web application is secure, fast, and reliable. From complex e-commerce platforms to bespoke web applications, our solutions are built on a foundation of clean code and responsive design.",
        features: [
            { title: "Frontend Magic", description: "Dynamic and responsive interfaces with React & Vue.", icon: <Code2 size={24} /> },
            { title: "Backend Power", description: "Scalable and secure server-side logic with Node.js & Python.", icon: <Database size={24} /> },
            { title: "API Integration", description: "Seamless connectivity with third-party services.", icon: <Bot size={24} /> },
        ]
    },
    {
        title: "Software Development",
        shortDescription: "Creating robust and scalable custom software solutions.",
        icon: <TerminalSquare size={36} className="text-yellow-400" />,
        imageUrl: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        detailedDescription: "Beyond the browser, our Software Development service delivers tailor-made applications that solve your unique business challenges. We architect and build solutions from the ground up, spanning the entire Software Development Life Cycle (SDLC), from initial ideation and requirement analysis to deployment and ongoing maintenance. We employ agile methodologies to ensure flexibility and transparency. Our team is proficient in multiple languages including Java, C#, and Python, allowing us to select the perfect technology stack for your project's needs.",
    },
    {
        title: "Digital Marketing",
        shortDescription: "Data-driven strategies to amplify your online presence.",
        icon: <LineChart size={36} className="text-yellow-400" />,
        imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        detailedDescription: "In the crowded digital marketplace, visibility is paramount. Our Digital Marketing services are designed to cut through the noise and connect you with your target audience. We employ a holistic, multi-channel approach that integrates Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, Social Media Marketing (SMM), and Content Marketing. Our strategies are built on deep market research and data analysis. We continuously monitor campaign performance, A/B test creatives, and optimize for the highest possible return on investment (ROI).",
    },
    {
        title: "Graphic Design",
        shortDescription: "Visually stunning designs that deliver exceptional experiences.",
        icon: <Paintbrush size={36} className="text-yellow-400" />,
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
        detailedDescription: "Graphic Design is the visual language of your brand. Our design philosophy is rooted in clarity, creativity, and purpose. We create comprehensive visual identities that include logo design, brand style guides, and marketing collateral. Our work extends to crafting stunning user interfaces (UI) that are not only beautiful but also intuitive and accessible. We believe that great design solves problems. From initial concepts and wireframes to polished final designs, we create visuals that captivate, communicate, and convert, ensuring your brand stands out.",
    },
    {
        title: "Web Designing",
        shortDescription: "Modern, user-friendly layouts that are functional and aesthetic.",
        icon: <LayoutTemplate size={36} className="text-yellow-400" />,
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        detailedDescription: "While web development builds the engine, web design creates the beautiful and functional body. Our Web Design service focuses exclusively on the user-facing aspects of your digital platform. We are obsessed with creating pixel-perfect, user-centric designs that drive engagement and conversions. The process starts with comprehensive user research, leading to detailed user personas and journey maps. We then move to wireframing and prototyping to establish a solid structural foundation before applying any visual design.",
    },
    {
        title: "Business Analyst",
        shortDescription: "Bridging the gap between business needs and technology.",
        icon: <BarChart3 size={36} className="text-yellow-400" />,
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        detailedDescription: "Our Business Analyst (BA) service is the crucial link between your business ambitions and your technology solutions. They immerse themselves in your operations, conducting stakeholder interviews, workshops, and data analysis to meticulously document your requirements. They translate complex business needs into clear, actionable specifications for our development and design teams. This process eliminates ambiguity, reduces development waste, and ensures the final product perfectly aligns with your strategic objectives.",
    },
];

const technologies = [
    { name: "React", icon: <Code2 /> }, { name: "Node.js", icon: <Database /> }, { name: "Python", icon: <TerminalSquare /> },
    { name: "JavaScript", icon: <Code2 /> }, { name: "TypeScript", icon: <Code2 /> }, { name: "GSAP", icon: <Wind /> },
    { name: "TailwindCSS", icon: <Paintbrush /> }, { name: "Figma", icon: <LayoutTemplate /> }, { name: "Next.js", icon: <Code2 /> },
    { name: "Java", icon: <TerminalSquare /> }, { name: "PostgreSQL", icon: <Database /> }, { name: "MongoDB", icon: <Database /> },
    { name: "Git", icon: <GitBranch /> }, { name: "Docker", icon: <Bot /> },
];

const whyChooseUsItems = [
    { icon: <Target size={40} />, title: "Results-Driven", description: "Our focus is on delivering measurable results that align with your business goals, ensuring a significant return on your investment." },
    { icon: <BrainCircuit size={40} />, title: "Expert Team", description: "Our team consists of industry veterans and passionate creators who are masters of their respective crafts." },
    { icon: <Users size={40} />, title: "Client-Centric", description: "We believe in building partnerships. Your vision is our guide, and we maintain transparent communication throughout the project." },
    { icon: <Award size={40} />, title: "Quality & Excellence", description: "We adhere to the highest standards of quality, ensuring that every deliverable is polished, robust, and scalable." },
];

const testimonials = [
    { quote: "Working with this team was a game-changer. Their attention to detail and commitment to our vision was unparalleled. The final product exceeded all our expectations!", name: "Alex Johnson", company: "CEO, Innovate Inc." },
    { quote: "The level of professionalism and expertise is simply top-notch. They transformed our digital presence and delivered tangible results in record time.", name: "Maria Garcia", company: "Marketing Director, Solutions Co." },
    { quote: "A truly collaborative partner. They listened to our needs, provided expert guidance, and built a solution that was perfect for our business. Highly recommended.", name: "Chen Wei", company: "Founder, Tech startups" },
];

const faqs = [
    { q: "What is the typical timeline for a web development project?", a: "A typical project can range from 4 to 12 weeks, depending on the complexity, features, and scope. We begin with a detailed discovery phase to provide a more accurate timeline for your specific project." },
    { q: "How do you handle project communication and updates?", a: "We believe in transparent and frequent communication. You'll have a dedicated project manager and access to a shared Slack channel or similar tool. We provide regular progress updates, typically on a weekly basis, and are always available for a call." },
    { q: "Do you provide ongoing support after the project is launched?", a: "Yes, absolutely. We offer a range of ongoing support and maintenance packages to ensure your website or application remains secure, up-to-date, and performs optimally. We're here to be your long-term technology partner." },
    { q: "Can you work with an existing website or application?", a: "Certainly. We can help you redesign, enhance, or migrate an existing platform. Our team will first conduct a thorough audit to understand the current architecture and identify areas for improvement." },
];


// --- MODAL COMPONENT ---
const ServiceModal = ({ service, onClose }) => {
    const modalRef = useRef(null);

    useLayoutEffect(() => {
        const { gsap } = window;
        if (!gsap) return;
        gsap.fromTo(modalRef.current,
            { scale: 0.8, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClose = () => {
        const { gsap } = window;
        if (!gsap) {
            onClose();
            return;
        }
        gsap.to(modalRef.current, {
            scale: 0.8, opacity: 0, y: 50, duration: 0.3, ease: 'power3.in',
            onComplete: onClose
        });
    };

    if (!service) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div ref={modalRef} className="bg-gray-900 border border-yellow-400/20 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 md:p-8">
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-yellow-400 transition-colors z-10">
                    <X size={28} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:h-full md:max-h-[75vh] rounded-lg overflow-hidden">
                        <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            {React.cloneElement(service.icon, { size: 48 })}
                            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">{service.title}</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{service.detailedDescription}</p>
                        {service.features && (
                            <div className="mt-6 space-y-4">
                                {service.features.map(feature => (
                                    <div key={feature.title} className="flex items-start gap-3">
                                        <div className="text-yellow-400 mt-1">{feature.icon}</div>
                                        <div>
                                            <h4 className="font-semibold text-lg">{feature.title}</h4>
                                            <p className="text-gray-400 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button onClick={handleClose} className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-md hover:bg-yellow-500 transition-colors duration-300 transform hover:scale-105">
                            Got it <CheckCircle2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- FAQ ITEM COMPONENT ---
const FaqItem = ({ q, a, isOpen, onClick }) => {
    const contentRef = useRef(null);
    return (
        <div className="border-b border-yellow-400/20" data-aos="fade-up">
            <button onClick={onClick} className="flex justify-between items-center w-full py-5 text-left">
                <h4 className="text-lg md:text-xl font-medium">{q}</h4>
                <span className="text-yellow-400 transition-transform duration-300 shrink-0 ml-4" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <ChevronDown size={24} />
                </span>
            </button>
            <div ref={contentRef} className="overflow-hidden transition-[max-height] duration-500 ease-in-out" style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}>
                <p className="pb-5 text-gray-400">{a}</p>
            </div>
        </div>
    );
};


// --- MAIN SERVICES PAGE COMPONENT ---
const ServicesPage = () => {
    const main = useRef(null);
    const techMarquee = useRef(null);
    const [selectedService, setSelectedService] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [libsLoaded, setLibsLoaded] = useState(false);

    // Load external libraries and CSS
    useEffect(() => {
        window.scrollTo(0, 0);

        const loadScript = (src, id) => {
            return new Promise((resolve, reject) => {
                if (document.getElementById(id)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.id = id;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.body.appendChild(script);
            });
        };

        const loadStyle = (href, id) => {
            return new Promise((resolve, reject) => {
                if (document.getElementById(id)) {
                    resolve();
                    return;
                }
                const link = document.createElement('link');
                link.href = href;
                link.id = id;
                link.rel = 'stylesheet';
                link.onload = () => resolve();
                link.onerror = () => reject(new Error(`Style load error for ${href}`));
                document.head.appendChild(link);
            });
        };

        Promise.all([
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap-script'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', 'gsap-scrolltrigger-script'),
            loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js', 'aos-script'),
            loadStyle('https://unpkg.com/aos@2.3.1/dist/aos.css', 'aos-style')
        ]).then(() => {
            setLibsLoaded(true);
        }).catch(console.error);

    }, []);

    const handleCardClick = (service, cardElement) => {
        const { gsap } = window;
        if (!gsap) return;
        gsap.to(cardElement, {
            rotationY: '+=180',
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                setSelectedService(service);
                gsap.set(cardElement, { rotationY: 0 });
            }
        });
    };

    const handleFaqToggle = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useLayoutEffect(() => {
        if (!libsLoaded) return;

        const { gsap, ScrollTrigger, AOS } = window;
        gsap.registerPlugin(ScrollTrigger);
        AOS.init({
            duration: 1000,
            once: true,
            disable: 'mobile'
        });

        const ctx = gsap.context(() => {
            const handleMouseMove = (event) => {
                const { clientX, clientY } = event;
                gsap.to(".cursor-light", {
                    '--x': `${clientX}px`, '--y': `${clientY}px`,
                    duration: 0.6, ease: 'power2.out',
                });
            };
            window.addEventListener('mousemove', handleMouseMove);

            gsap.from(".hero-char", {
                yPercent: 130, stagger: 0.05, ease: "back.out", duration: 1,
            });

            if (techMarquee.current) {
                const marqueeWidth = techMarquee.current.scrollWidth / 2;
                gsap.to(techMarquee.current, {
                    x: -marqueeWidth,
                    duration: 40,
                    ease: 'none',
                    repeat: -1,
                });
            }

            const steps = gsap.utils.toArray('.process-step');
            steps.forEach((step) => {
                gsap.from(step, {
                    opacity: 0, y: 100,
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            });

            const counters = gsap.utils.toArray('.stat-number');
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                let counterObj = { val: 0 };

                gsap.to(counterObj, {
                    val: target,
                    duration: 3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    onUpdate: () => {
                        counter.innerText = Math.ceil(counterObj.val).toLocaleString();
                    }
                });
            });

        }, main);

        const testimonialInterval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);

        return () => {
            ctx.revert();
            clearInterval(testimonialInterval);
        };
    }, [libsLoaded]);

    return (
        <div ref={main} className="bg-black text-white font-sans overflow-x-hidden">
            <div className="cursor-light fixed inset-0 pointer-events-none z-[100] hidden md:block" style={{ '--x': '50vw', '--y': '50vh', background: 'radial-gradient(circle at var(--x) var(--y), rgba(250, 204, 21, 0.15), transparent 30vw)' }} />

            {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}

            {/* Hero Section */}
            <section className="h-screen w-full flex flex-col justify-center items-center relative text-center px-4">
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
                    {"OUR SERVICES".split("").map((char, i) => (
                        <span key={i} className="inline-block overflow-hidden">
                            <span className="hero-char inline-block" style={{ whiteSpace: 'pre' }}>{char === ' ' ? '\u00A0' : char}</span>
                        </span>
                    ))}
                </h1>
                <p className="text-lg md:text-xl text-yellow-400 mt-6 max-w-3xl" data-aos="fade-up" data-aos-delay="500">
                    We combine strategy, design, and technology to build digital solutions that drive growth and create lasting value.
                </p>
                <div className="absolute bottom-10 animate-bounce text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 14L12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="py-20 md:py-28 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-6xl font-bold">Explore Our Expertise</h2>
                        <p className="text-lg text-yellow-400 mt-4">Click on a service to discover more.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
                        {services.map((service, index) => (
                            <div key={index} className="service-card-container" data-aos="fade-up" data-aos-delay={index * 50}>
                                <div onClick={(e) => handleCardClick(service, e.currentTarget)} className="service-card relative h-64 p-6 flex flex-col justify-between rounded-xl border border-yellow-400/20 bg-gray-900/50 cursor-pointer transition-all duration-300 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-400/10 transform-style-3d hover:-translate-y-2">
                                    <div>
                                        {service.icon}
                                        <h3 className="text-2xl font-bold mt-4">{service.title}</h3>
                                    </div>
                                    <p className="text-gray-400">{service.shortDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-6xl font-bold">Why Partner With Us?</h2>
                        <p className="text-lg text-yellow-400 mt-4">The core pillars of our commitment to you.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUsItems.map((item, index) => (
                            <div key={index} className="why-choose-us-card text-center p-8 rounded-lg border border-transparent hover:border-yellow-400/50 transition-all duration-300 bg-gray-900 hover:-translate-y-2" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="inline-block p-4 bg-gray-800 rounded-full text-yellow-400 mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Marquee Section */}
            <section className="py-20 md:py-28 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-6xl font-bold">Technologies We Use</h2>
                        <p className="text-lg text-yellow-400 mt-4">Leveraging the best tools for the best results.</p>
                    </div>
                    <div className="relative w-full marquee-container">
                        <div ref={techMarquee} className="flex whitespace-nowrap">
                            {[...technologies, ...technologies].map((tech, index) => (
                                <div key={index} className="tech-item flex items-center gap-3 mx-4 md:mx-6 px-6 py-3 rounded-lg border border-gray-700 bg-gray-800">
                                    <span className="text-yellow-400">{tech.icon}</span>
                                    <span className="text-lg font-medium">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-20 md:py-28 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <h2 className="text-4xl md:text-6xl font-bold">Our Four-Step Process</h2>
                        <p className="text-lg text-yellow-400 mt-4">A proven path to digital success.</p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-0.5 bg-yellow-400/20 timeline-line"></div>
                        <div className="space-y-16 md:space-y-24">
                        {[
                            { icon: <BrainCircuit size={32} />, title: "Discovery & Strategy", description: "We dive deep into your goals, audience, and market to build a comprehensive project roadmap." },
                            { icon: <PenTool size={32} />, title: "Design & Prototyping", description: "Crafting intuitive, beautiful user interfaces and experiences that are tested and validated." },
                            { icon: <Code2 size={32} />, title: "Development & Testing", description: "Bringing designs to life with clean, efficient code and rigorous quality assurance testing." },
                            { icon: <ShieldCheck size={32} />, title: "Deployment & Growth", description: "Launching your project and providing ongoing support to ensure continued success and growth." }
                        ].map((step, index) => (
                             <div key={index} className="process-step relative flex items-center w-full">
                                <div className="timeline-node absolute left-4 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 bg-gray-900 border-2 border-yellow-400 rounded-full p-4 z-10">
                                    {step.icon}
                                </div>
                                <div className={`w-full pl-16 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">{`0${index + 1}. ${step.title}`}</h3>
                                    <p className="mt-2 text-gray-300">{step.description}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 md:py-28 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="stat-item p-4" data-aos="fade-up">
                            <h3 className="stat-number text-5xl md:text-6xl font-bold text-yellow-400" data-target="150">0</h3>
                            <p className="text-lg md:text-xl mt-2">Projects Completed</p>
                        </div>
                        <div className="stat-item p-4" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="stat-number text-5xl md:text-6xl font-bold text-yellow-400" data-target="99">0</h3>
                            <p className="text-lg md:text-xl mt-2">% Client Satisfaction</p>
                        </div>
                        <div className="stat-item p-4" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="stat-number text-5xl md:text-6xl font-bold text-yellow-400" data-target="500000">0</h3>
                            <p className="text-lg md:text-xl mt-2">Lines of Code Written</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 md:py-28 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-12" data-aos="fade-up">
                        <h2 className="text-4xl md:text-6xl font-bold">What Our Clients Say</h2>
                        <p className="text-lg text-yellow-400 mt-4">Real stories from our valued partners.</p>
                    </div>
                    <div className="testimonial-slider relative h-64" data-aos="fade-up" data-aos-delay="200">
                        {testimonials.map((testimonial, index) => (
                             <div key={index} className={`testimonial-slide absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}>
                                <MessageSquare className="mx-auto mb-4 text-yellow-400" size={48} />
                                <blockquote className="text-xl md:text-2xl italic text-gray-200">"{testimonial.quote}"</blockquote>
                                <p className="mt-6 text-xl font-semibold">{testimonial.name}</p>
                                <p className="text-yellow-400">{testimonial.company}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
             <section className="py-20 md:py-28 bg-gray-900/50">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-6xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-lg text-yellow-400 mt-4">Have questions? We have answers.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                           <FaqItem 
                                key={index}
                                q={faq.q}
                                a={faq.a}
                                isOpen={openFaq === index}
                                onClick={() => handleFaqToggle(index)}
                           />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 px-4 md:px-8 text-center">
                 <div className="max-w-4xl mx-auto" data-aos="zoom-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold">Have a project in mind?</h2>
                    <p className="text-lg md:text-xl text-gray-300 mt-4 mb-8">Let's turn your idea into a digital reality. We're here to help you succeed.</p>
                    <button className="cta-button inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-yellow-400 text-black text-lg md:text-xl font-bold rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110">
                        Let's Talk <ArrowRight size={22} />
                    </button>
                 </div>
            </section>

        </div>
    );
};
export default ServicesPage;
