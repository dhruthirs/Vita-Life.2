import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Lock, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (login(username, password, true)) {
        navigate('/dashboard');
      } else {
        setError('Invalid admin credentials');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <style>{`
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-right { animation: slide-in-right 0.8s ease-out; }
      `}</style>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        {/* Left Section */}
        <div className="space-y-8 animate-slide-left">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-300 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-indigo-900" />
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Blood-Donation
              </h1>
            </div>
            <p className="text-2xl font-black text-white mb-4">Admin Access</p>
            <p className="text-lg text-gray-100 leading-relaxed">
              Secure administrative portal for managing donors, blood inventory, reports, and system settings.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-400/30 transition-all">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Restricted Access</h3>
                <p className="text-gray-200 text-sm">Only authorized administrators</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center group-hover:bg-blue-400/30 transition-all">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Full Control</h3>
                <p className="text-gray-200 text-sm">Complete system management capabilities</p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-400/10 border-2 border-cyan-400/30 rounded-xl p-4">
            <p className="text-gray-100 text-sm">
              <span className="font-bold text-cyan-300">Demo Credentials:</span><br />
              Username: <code className="text-amber-300">admin</code><br />
              Password: <code className="text-amber-300">admin123</code>
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="animate-slide-right">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-300 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-900" />
              </div>
              <h2 className="text-3xl font-black text-white">Admin Login</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl text-red-200 font-bold animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-2">Administrator Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-gray-300 focus:border-cyan-300 focus:outline-none transition-all"
                  placeholder="Enter admin username"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">Administrator Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-gray-300 focus:border-cyan-300 focus:outline-none transition-all"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-300 text-indigo-900 py-3 rounded-xl font-black text-lg hover:from-cyan-300 hover:to-blue-200 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Verifying...' : 'Admin Login'}</span>
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-gray-200 text-center mb-4">Are you a donor?</p>
              <Link
                to="/login"
                className="block text-center bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl transition-all no-underline"
              >
                Donor Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
