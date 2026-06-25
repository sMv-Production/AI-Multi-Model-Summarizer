import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Fixed: Create an explicitly animated version of the React Router Link component
const MotionLink = motion(Link);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <nav className="bg-slate-100/80 backdrop-blur-md border-b border-slate-300 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center">
            <MotionLink
              to="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // Light Theme: Rich text gradient values optimized for light backgrounds
              className="text-xl font-extrabold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent tracking-wider transition-all duration-300"
            >
              NeuroDigest
            </MotionLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.name}
                  to={link.to}
                  // Added contextual class toggle to visually distinguish active tabs
                  className={`font-bold text-sm tracking-wide transition-all duration-200 
                    ${isActive 
                      ? 'text-cyan-700 border-b-2 border-cyan-600 pb-0.5' 
                      : 'text-slate-600 hover:text-cyan-600'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-600 hover:text-teal-700 focus:outline-none p-2 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-slate-300 bg-slate-100/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-4 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`block px-4 py-2.5 rounded-xl text-base font-bold tracking-wide transition-all duration-200
                      ${isActive 
                        ? 'text-cyan-700 bg-slate-200' 
                        : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-200/60'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;