import React from 'react';
import { Droplet, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-400 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-400 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                Save Lives with Blood
              </h1>
              <p className="text-xl text-white drop-shadow-md max-w-md">
                Every donation can save up to 3 lives. Join our mission to ensure blood sufficiency across the nation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register-donor"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Become a Donor
              </Link>
              <Link
                to="/search-donor"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-all transform hover:scale-105"
              >
                Find Blood
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white drop-shadow-lg">128K+</p>
                <p className="text-white drop-shadow-md text-sm">Units Collected</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white drop-shadow-lg">385K+</p>
                <p className="text-white drop-shadow-md text-sm">Lives Saved</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white drop-shadow-lg">1.4K+</p>
                <p className="text-white drop-shadow-md text-sm">Camps Organized</p>
              </div>
            </div>
          </div>

          {/* Right Section - Info Box */}
          <div className="space-y-6">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Droplet className="w-8 h-8 text-white flex-shrink-0 mt-1 drop-shadow-lg" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white drop-shadow-lg">Blood Urgency</h3>
                    <p className="text-white drop-shadow-md text-sm">India requires 15 million units annually. We collect 13 million. Help bridge the gap!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Heart className="w-8 h-8 text-white flex-shrink-0 mt-1 drop-shadow-lg" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white drop-shadow-lg">Safe & Easy</h3>
                    <p className="text-white drop-shadow-md text-sm">Professional medical staff ensures safe donation process. Takes just 10-15 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-white flex-shrink-0 mt-1 drop-shadow-lg" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white drop-shadow-lg">Make Impact</h3>
                    <p className="text-white drop-shadow-md text-sm">One donation can save up to 3 lives. Join our community of heroes.</p>
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
