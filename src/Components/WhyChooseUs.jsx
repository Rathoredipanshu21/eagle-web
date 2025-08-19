import React from 'react';




// WhyChooseUs.jsx component
const WhyChooseUs = () => {
    // useRef to get a direct reference to the cursor light DOM element
    const cursorLightRef = React.useRef(null);

    // useEffect to handle side effects, like adding event listeners
    React.useEffect(() => {
        // Ensure GSAP is loaded before using it
        if (window.gsap) {
            const cursorLight = cursorLightRef.current;

            // Set initial properties of the light using GSAP for better performance
            window.gsap.set(cursorLight, { xPercent: -50, yPercent: -50 });

            // Function to handle the mouse movement
            const handleMouseMove = (e) => {
                // Use GSAP to smoothly animate the light to the cursor's position
                window.gsap.to(cursorLight, {
                    duration: 0.5, // Animation duration for a smooth follow
                    x: e.clientX,
                    y: e.clientY,
                    ease: "power1.out" // Easing function for a natural feel
                });
            };

            // Add the event listener to the window
            window.addEventListener('mousemove', handleMouseMove);

            // Cleanup function: remove the event listener when the component unmounts
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // List of features to display
    const features = [
        "Expertise and Specialization",
        "Time and Resource Efficiency",
        "Scalability and Flexibility",
        "Access to Tools and Technology",
        "Measurable Results and ROI"
    ];

    // SVG icon for the list items
    const ArrowIcon = () => (
        <svg className="w-6 h-6 text-yellow-400 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
        </svg>
    );

    return (
        <div className="whychooseus-container" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* The custom styles are applied via Tailwind or inline styles */}
            <style>{`
                /* Scoped styles for the WhyChooseUs component */
                .whychooseus-container body {
                    overflow: hidden; /* Prevents scrollbars from the cursor light */
                }
                .whychooseus-main-section {
                    background-image: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                    background-size: cover;
                    background-position: center;
                }
                .whychooseus-overlay {
                    background: linear-gradient(to right, rgba(22, 22, 22, 0.95) 50%, rgba(22, 22, 22, 0.7) 70%, rgba(22, 22, 22, 0) 100%);
                }
                .whychooseus-cursor-light {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 800px;
                    height: 800px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255, 223, 0, 0.25) 0%, rgba(255, 223, 0, 0) 60%);
                    pointer-events: none;
                    z-index: 9999;
                }
            `}</style>

            {/* The div for the cursor light effect, referenced by cursorLightRef */}
            <div ref={cursorLightRef} className="whychooseus-cursor-light"></div>

            <main className="relative min-h-screen flex items-center bg-gray-900 text-white whychooseus-main-section">
                {/* Overlay for the text content */}
                <div className="absolute inset-0 whychooseus-overlay"></div>
                
                {/* Right-side yellow accent bar */}
                <div className="absolute right-0 top-0 h-full w-8 md:w-16 bg-yellow-400 opacity-80"></div>

                {/* Content container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Column: Text Content */}
                        <div className="p-8 space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
                                WHY <span className="text-yellow-400">EAGLEWEB</span>
                            </h1>
                            
                            <p className="text-gray-300 text-lg">
                                At Eagleweb, we provide valuable expertise and services to businesses looking to establish or improve their online presence and reach their target audience effectively.
                            </p>
                            
                            <p className="text-gray-300 text-lg">
                                Here are a few reasons why a business may choose to work with a EagleWeb:
                            </p>

                            <ul className="space-y-4 text-lg">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <ArrowIcon />
                                        <span className="text-gray-200">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column: Empty, for visual balance where the background image shows through */}
                        <div className="hidden md:block"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Export the WhyChooseUs component as the default export
export default WhyChooseUs;
