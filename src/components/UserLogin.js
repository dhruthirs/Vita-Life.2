import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, User, Lock, ArrowRight, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(async () => {
      const result = await login(name, password, false);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Invalid credentials');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-rose-900 flex items-center justify-center p-4">
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
              <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-yellow-200 rounded-xl flex items-center justify-center">
                <Droplet className="w-8 h-8 text-red-700" />
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent">
                Blood-Donation
              </h1>
            </div>
            <p className="text-2xl font-black text-white mb-4">Welcome Back, Donor!</p>
            <p className="text-lg text-gray-100 leading-relaxed">
              Login to your account to manage your donations, find blood donors, and make a difference in someone's life.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-amber-300/20 rounded-xl flex items-center justify-center group-hover:bg-amber-300/30 transition-all">
                <User className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">Easy Access</h3>
                <p className="text-gray-200 text-sm">Login with your registered name</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-rose-300/20 rounded-xl flex items-center justify-center group-hover:bg-rose-300/30 transition-all">
                <Lock className="w-6 h-6 text-rose-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">Secure & Safe</h3>
                <p className="text-gray-200 text-sm">Your information is protected</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-300/10 border-2 border-amber-300/30 rounded-xl p-4">
            <p className="text-gray-100 text-sm">
              <span className="font-bold text-amber-300">First time here?</span><br />
              You must register as a donor first with all your details.<br />
              Use your <span className="text-amber-200 font-bold">name</span> and <span className="text-amber-200 font-bold">phone number</span> to login.
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="animate-slide-right">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-8">Donor Login</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl text-red-200 font-bold animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-gray-300 focus:border-amber-300 focus:outline-none transition-all"
                  placeholder="Enter your registered name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">Password (Phone Number)</label>
                <input
                  type="tel"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-gray-300 focus:border-amber-300 focus:outline-none transition-all"
                  placeholder="Enter your phone number as password"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
                <p className="text-xs text-amber-200 mt-2">Use your registered phone number as password</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-300 to-yellow-200 text-red-900 py-3 rounded-xl font-black text-lg hover:from-amber-200 hover:to-yellow-100 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Logging in...' : 'Login Now'}</span>
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-gray-200 text-center mb-4">Don't have an account?</p>
              <Link
                to="/register-donor"
                className="block text-center bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl transition-all no-underline"
              >
                Register as Donor
              </Link>
            </div>

            <div className="mt-4">
              <Link
                to="/admin-login"
                className="block text-center text-amber-300 font-bold hover:text-amber-200 transition-all no-underline text-sm"
              >
                Admin Login →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
