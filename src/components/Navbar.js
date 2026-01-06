import React, { useState, useEffect } from 'react';
import { Menu, X, Droplet, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Donor', path: '/search-donor' },
    { name: 'Donor Map', path: '/donor-map' },
    { name: 'Register', path: '/register-donor' },
    { name: 'Reports', path: '/reports' },
    { name: 'Admin Panel', path: '/dashboard', restricted: true },
  ];

  const visibleLinks = navLinks.filter(link => !link.restricted || isAdmin);

  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

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
            <span className={`font-black text-xl no-underline bg-gradient-to-r ${isHome ? 'from-amber-200 to-yellow-100 bg-clip-text text-transparent' : 'from-red-600 to-rose-600 bg-clip-text text-transparent'}`}>
              Blood-Donation
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl font-bold no-underline transition-all transform duration-300 ${
                  location.pathname === link.path
                    ? (isHome ? 'text-white bg-gradient-to-r from-amber-400/40 to-yellow-400/30 shadow-lg scale-105' : 'text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-lg scale-105')
                    : (isHome ? 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-110' : 'text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-rose-500 hover:scale-110')
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${isHome ? 'text-white' : 'text-gray-800'}`}>
                  <User size={18} />
                  <span className="font-bold text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-xl font-bold no-underline bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all transform duration-300 flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-xl font-bold no-underline bg-gradient-to-r from-amber-300 to-yellow-200 text-red-900 shadow-xl hover:shadow-2xl hover:scale-110 transition-all transform duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register-donor"
                  className="px-8 py-2 rounded-xl font-bold no-underline bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all transform duration-300"
                >
                  Donate Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-br from-white to-gray-50 border-b-2 border-red-200 shadow-lg">
            <div className="p-6 space-y-4">
              {visibleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-xl font-bold no-underline transition-all transform duration-200 ${
                    location.pathname === link.path
                      ? 'text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-lg scale-105'
                      : 'text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-rose-500 hover:scale-105'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-gray-800 font-bold border-t pt-4">
                    <User size={18} className="inline mr-2" />
                    {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-all text-center flex items-center justify-center space-x-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full bg-amber-300 text-red-900 px-6 py-2 rounded-xl font-bold hover:bg-amber-200 transition-all text-center no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Donor Login
                  </Link>
                  <Link
                    to="/admin-login"
                    className="block w-full bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all text-center no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Login
                  </Link>
                  <Link
                    to="/register-donor"
                    className="block w-full bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-all text-center no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Donate Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
