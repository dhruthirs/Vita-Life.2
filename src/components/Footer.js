import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Blood-Donation</span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting donors with those in need. Making blood sufficiency a reality across the nation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-400 transition">Home</Link></li>
              <li><Link to="/search-donor" className="hover:text-red-400 transition">Find Blood</Link></li>
              <li><Link to="/register-donor" className="hover:text-red-400 transition">Donate</Link></li>
              <li><Link to="/reports" className="hover:text-red-400 transition">Reports</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-red-400 transition">About Us</button></li>
              <li><button className="hover:text-red-400 transition">Our Mission</button></li>
              <li><button className="hover:text-red-400 transition">Impact Stats</button></li>
              <li><button className="hover:text-red-400 transition">Blog</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+919999999999" className="hover:text-red-400 transition">+91 999-999-9999</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@blooddon.org" className="hover:text-red-400 transition">info@blooddon.org</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} Blood-Donation Foundation. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="hover:text-red-400 transition">Privacy Policy</button>
              <button className="hover:text-red-400 transition">Terms & Conditions</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
