import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// In a real React project, you would include these scripts and links 
// in your main public/index.html file, not within a component.
/*
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
*/


const Footer = () => {
    // Initialize AOS library on component mount
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true,     // Whether animation should happen only once
        });
    }, []);

    return (
        <>
            {/* Wrapper for the footer with background and text color */}
            <footer className="bg-gray-900 text-gray-300 font-sans py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Section 1: About / Brand Info */}
                        <div data-aos="fade-up">
                            <h3 className="text-2xl font-bold text-yellow-400 mb-4">EagleWeb</h3>
                            <p className="pr-4">
                                Providing top-tier web solutions to elevate your business and online presence. We specialize in creating impactful digital experiences.
                            </p>
                        </div>

                        {/* Section 2: Quick Links */}
                        <div data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                {['Home', 'About Us', 'Services', 'Portfolio', 'Contact'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="hover:text-yellow-400 transition-colors duration-300 flex items-center">
                                            <i className="fas fa-chevron-right text-yellow-400 mr-2 text-xs"></i>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 3: Contact Details */}
                        <div data-aos="fade-up" data-aos-delay="400">
                            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <i className="fas fa-map-marker-alt text-yellow-400 mt-1 mr-3"></i>
                                    <span>123 Tech Avenue, Silicon Valley, CA 94043</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-phone-alt text-yellow-400 mr-3"></i>
                                    <a href="tel:+1234567890" className="hover:text-yellow-400 transition-colors duration-300">+1 (234) 567-890</a>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-envelope text-yellow-400 mr-3"></i>
                                    <a href="mailto:contact@eagleweb.com" className="hover:text-yellow-400 transition-colors duration-300">contact@eagleweb.com</a>
                                </li>
                            </ul>
                        </div>

                        {/* Section 4: Email Subscription */}
                        <div data-aos="fade-up" data-aos-delay="600">
                            <h3 className="text-xl font-semibold text-white mb-4">Subscribe</h3>
                            <p className="mb-4">Get the latest updates and offers.</p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-r-md hover:bg-yellow-500 transition-colors duration-300"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom section with social media and copyright */}
                    <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
                            &copy; {new Date().getFullYear()} EagleWeb. All Rights Reserved.
                        </p>
                        <div className="flex space-x-4">
                            {['facebook-f', 'twitter', 'instagram', 'linkedin-in', 'github'].map(icon => (
                                <a key={icon} href="#" className="text-gray-400 hover:text-yellow-400 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <i className={`fab fa-${icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
