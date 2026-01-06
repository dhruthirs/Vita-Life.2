import React from 'react';
import { Droplet, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden bg-gradient-to-br from-red-900 via-red-700 to-rose-900"
    >
      {/* Animated Decorative elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-25px) rotateZ(5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-80px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
        .animate-slide-left { animation: slide-in-left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slide-up { animation: slide-in-up 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 2.5s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
      <div className="absolute top-10 right-10 w-80 h-80 bg-rose-400 rounded-full opacity-15 blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-400 rounded-full opacity-15 blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-rose-300 rounded-full opacity-10 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-300 rounded-full opacity-8 blur-2xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8 animate-slide-left" style={{ animationDelay: '0.2s' }}>
            <div className="animate-bounce-in">
              <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6 text-white drop-shadow-2xl tracking-tighter no-underline">
                Save Lives with <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-300 bg-clip-text text-transparent animate-shimmer drop-shadow-xl font-black">Blood</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 drop-shadow-lg max-w-md font-medium leading-relaxed">
                Every donation can save up to 3 lives. Join our mission to ensure blood sufficiency across the nation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/register-donor"
                className="bg-gradient-to-r from-amber-300 to-yellow-200 text-red-900 px-8 py-4 rounded-xl font-black text-lg no-underline hover:from-amber-200 hover:to-yellow-100 transition-all transform hover:scale-110 hover:shadow-3xl shadow-2xl active:scale-95 duration-300 uppercase tracking-wide"
              >
                Become a Donor
              </Link>
              <Link
                to="/search-donor"
                className="border-3 border-amber-300 text-amber-100 px-8 py-4 rounded-xl font-black text-lg no-underline hover:bg-amber-300/30 hover:border-white/70 transition-all transform hover:scale-110 backdrop-blur-md active:scale-95 duration-300 shadow-lg uppercase tracking-wide"
              >
                Find Blood
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="space-y-2 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-4 rounded-2xl border-2 border-white/30 hover:from-white/25 hover:to-white/10 hover:border-amber-300/50 transition-all transform hover:scale-110 shadow-xl duration-300">
                <p className="text-4xl font-black text-white drop-shadow-lg">128K+</p>
                <p className="text-white/95 drop-shadow-md text-sm font-bold">Units Collected</p>
              </div>
              <div className="space-y-2 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-4 rounded-2xl border-2 border-white/30 hover:from-white/25 hover:to-white/10 hover:border-amber-300/50 transition-all transform hover:scale-110 shadow-xl duration-300" style={{ animationDelay: '0.1s' }}>
                <p className="text-4xl font-black text-white drop-shadow-lg">385K+</p>
                <p className="text-white/95 drop-shadow-md text-sm font-bold">Lives Saved</p>
              </div>
              <div className="space-y-2 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-4 rounded-2xl border-2 border-white/30 hover:from-white/25 hover:to-white/10 hover:border-amber-300/50 transition-all transform hover:scale-110 shadow-xl duration-300" style={{ animationDelay: '0.2s' }}>
                <p className="text-4xl font-black text-white drop-shadow-lg">1.4K+</p>
                <p className="text-white/95 drop-shadow-md text-sm font-bold">Camps Organized</p>
              </div>
            </div>
          </div>

          {/* Right Section - Info Box */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-white/20 via-white/12 to-white/8 rounded-3xl p-8 border-2 border-white/40 backdrop-blur-xl shadow-2xl hover:from-white/30 hover:via-white/20 hover:to-white/15 hover:border-amber-300/60 transition-all transform hover:scale-105 duration-300">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-300 to-yellow-200 rounded-xl flex items-center justify-center group-hover:from-amber-200 group-hover:to-yellow-100 transition-all transform group-hover:scale-110 shadow-lg duration-300">
                    <Droplet className="w-7 h-7 text-red-700 flex-shrink-0 drop-shadow-lg font-bold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl mb-2 text-white drop-shadow-lg">Blood Urgency</h3>
                    <p className="text-white/90 drop-shadow-md text-sm leading-relaxed">India requires 15 million units annually. We collect 13 million. Help bridge the gap!</p>
                  </div>
                </div>

                <div className="border-t border-white/20"></div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-300 to-pink-200 rounded-xl flex items-center justify-center group-hover:from-rose-200 group-hover:to-pink-100 transition-all transform group-hover:scale-110 shadow-lg duration-300">
                    <Heart className="w-7 h-7 text-red-700 flex-shrink-0 drop-shadow-lg font-bold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl mb-2 text-white drop-shadow-lg">Safe & Easy</h3>
                    <p className="text-white/90 drop-shadow-md text-sm leading-relaxed">Professional medical staff ensures safe donation process. Takes just 10-15 minutes.</p>
                  </div>
                </div>

                <div className="border-t border-white/20"></div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-300 to-blue-200 rounded-xl flex items-center justify-center group-hover:from-cyan-200 group-hover:to-blue-100 transition-all transform group-hover:scale-110 shadow-lg duration-300">
                    <Users className="w-7 h-7 text-red-700 flex-shrink-0 drop-shadow-lg font-bold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl mb-2 text-white drop-shadow-lg">Community Driven</h3>
                    <p className="text-white/90 drop-shadow-md text-sm leading-relaxed">Join thousands of donors who have already saved lives. Be part of something meaningful.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
