<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Import Link
import logo from "../Assets/logo.png";
=======
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
>>>>>>> 57e2a9f0795f23e2210a8cc4d6a37e7289f3946c

const Navbar = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect for the mouse-following light beam
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (headerRef.current) {
        headerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  // ✅ Updated nav items with routes
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 nav-v-light"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="navbar-container relative bg-black/30 backdrop-blur-lg rounded-full border border-yellow-500/20 shadow-lg shadow-yellow-900/40 p-4">
          <div className="flex items-center justify-between px-4">
            {/* ✅ Logo links to Home */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Glow Logo"
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/32x32/000000/FFFFFF?text=Error";
                }}
              />
              <span
                className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-400"
                style={{
                  fontFamily: "Gillroy, 'Poppins', 'Bebas Neue', sans-serif",
                }}
              >
                EAGLE<span style={{ color: "#fff" }}>W</span>EB
              </span>
            </Link>

            {/* ✅ Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 relative">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-yellow-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden md:inline-block px-4 py-2 text-sm bg-yellow-500 text-slate-900 rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-md shadow-yellow-500/20 hover:shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-0.5">
                Get Started
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-slate-400 z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Full-Screen Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 transition-opacity duration-300 ease-in-out">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-3xl font-semibold text-slate-300 hover:text-yellow-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)} // close menu on click
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Light beam effect */}
      <style jsx global>{`
        .nav-v-light::after {
          content: "";
          position: fixed;
          top: 5rem;
          left: var(--mouse-x, 50%);
          width: 1px;
          height: 100vh;
          background: linear-gradient(
            to bottom,
            rgba(234, 179, 8, 0.4) 0%,
            rgba(234, 179, 8, 0) 50%
          );
          transform: translateX(-50%);
          pointer-events: none;
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .nav-v-light:hover::after {
          opacity: 1;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
