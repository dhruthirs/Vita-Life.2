import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, AlertCircle, MapPin } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-red-100 leading-relaxed">
            Join thousands of donors who are making a real difference. Your blood donation can save up to 3 lives. 
            It only takes 10-15 minutes and can be done at our camps across the city.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Heart className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Safe Process</h3>
              <p className="text-red-100 text-sm">Professional medical staff ensures your safety and comfort throughout the donation process.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <AlertCircle className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Quick & Easy</h3>
              <p className="text-red-100 text-sm">Just 10-15 minutes of your time can save up to 3 lives. No appointment needed for camps.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Multiple Locations</h3>
              <p className="text-red-100 text-sm">Find blood donation camps near you or arrange a camp for your organization.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              to="/register-donor"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Become a Donor
            </Link>
            <Link
              to="/search-donor"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-all transform hover:scale-105"
            >
              Find Blood Now
            </Link>
          </div>

          <p className="text-sm text-red-100 pt-8">
            Emergency? Call our 24/7 helpline for immediate blood assistance
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
