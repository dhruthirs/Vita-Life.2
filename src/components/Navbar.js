import React, { useState, useEffect } from 'react';
import { Menu, X, Droplet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Donor', path: '/search-donor' },
    { name: 'Register', path: '/register-donor' },
    { name: 'Reports', path: '/reports' },
    { name: 'Admin Panel', path: '/dashboard' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome
          ? (isScrolled ? 'bg-black/60 shadow-sm' : 'bg-transparent')
          : (isScrolled ? 'bg-white shadow-lg' : 'bg-white/30 backdrop-blur-sm')
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <span className={`font-bold text-xl ${isHome ? 'text-white' : 'text-slate-900'}`}>
              Blood-Donation
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === link.path
                    ? (isHome ? 'text-white bg-white/10' : 'text-red-600 bg-red-50')
                    : (isHome ? 'text-white hover:text-red-200 hover:bg-white/5' : 'text-gray-700 hover:text-red-600 hover:bg-gray-50')
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/register-donor"
              className={`px-6 py-2 rounded-lg font-medium hover:scale-105 transition-all ${isHome ? 'bg-red-600 text-white' : 'bg-red-600 text-white'}`}
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/register-donor"
                className="block w-full bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-all text-center"
                onClick={() => setIsOpen(false)}
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
