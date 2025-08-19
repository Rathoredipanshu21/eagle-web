import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaTwitter, FaCode, FaBullhorn } from "react-icons/fa";
import gsap from "gsap";

const ContactPage = () => {
  useEffect(() => {
    // Cursor Light Effect
    const light = document.querySelector(".contactpage-container-light");

    const moveLight = (e) => {
      gsap.to(light, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveLight);
    return () => window.removeEventListener("mousemove", moveLight);
  }, []);

  return (
    <div className="contactpage-container-main relative bg-black text-white min-h-screen overflow-hidden">
      {/* Cursor Light */}
      <div className="contactpage-container-light absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-yellow-400 opacity-40 blur-[80px] pointer-events-none mix-blend-screen -translate-x-1/2 -translate-y-1/2"></div>

      {/* Hero Section */}
      <section className="contactpage-container-hero text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
          Let’s Connect & Grow Your Business
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          We specialize in <FaCode className="inline text-yellow-400" /> Web Development &{" "}
          <FaBullhorn className="inline text-yellow-400" /> Digital Marketing strategies to help your business thrive.
        </p>
      </section>

      {/* Contact Info */}
      <section className="contactpage-container-info flex flex-col md:flex-row justify-center gap-8 px-6 py-16">
        <div className="bg-white/5 p-8 rounded-xl text-center hover:scale-105 transition shadow-lg hover:shadow-yellow-400">
          <FaPhoneAlt className="text-3xl text-yellow-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold">Phone</h3>
          <p className="text-gray-300 mt-2">+91 98765 43210</p>
        </div>
        <div className="bg-white/5 p-8 rounded-xl text-center hover:scale-105 transition shadow-lg hover:shadow-yellow-400">
          <FaEnvelope className="text-3xl text-yellow-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold">Email</h3>
          <p className="text-gray-300 mt-2">info@eagleweb.com</p>
        </div>
        <div className="bg-white/5 p-8 rounded-xl text-center hover:scale-105 transition shadow-lg hover:shadow-yellow-400">
          <FaMapMarkerAlt className="text-3xl text-yellow-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold">Address</h3>
          <p className="text-gray-300 mt-2">Cyber Hub, Bengaluru, India</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contactpage-container-form text-center py-16 px-6">
        <h2 className="text-3xl font-bold text-yellow-400">Send Us a Message</h2>
        <form className="mt-8 flex flex-col items-center">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full md:w-2/3 p-3 rounded-md mb-4 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full md:w-2/3 p-3 rounded-md mb-4 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            placeholder="Your Message"
            className="w-full md:w-2/3 p-3 rounded-md mb-4 h-32 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-white transition hover:shadow-yellow-400 hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Social Links */}
      <section className="contactpage-container-social text-center py-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Follow Us</h2>
        <div className="flex justify-center gap-6 text-3xl">
          <a href="#" className="text-yellow-400 hover:text-white hover:drop-shadow-[0_0_10px_#facc15] transition"><FaLinkedin /></a>
          <a href="#" className="text-yellow-400 hover:text-white hover:drop-shadow-[0_0_10px_#facc15] transition"><FaFacebook /></a>
          <a href="#" className="text-yellow-400 hover:text-white hover:drop-shadow-[0_0_10px_#facc15] transition"><FaTwitter /></a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
