import React from 'react';
import { Heart, AlertCircle, Users, MapPin } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Heart,
      title: 'Blood Donation Camps',
      description: 'We organize professional blood donation camps across cities with medical staff and safe collection practices.',
      color: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      icon: AlertCircle,
      title: 'Emergency Support',
      description: 'In need of blood urgently? Our 24/7 helpline connects you with available donors in your area.',
      color: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      icon: Users,
      title: 'Donor Community',
      description: 'Join thousands of regular donors and be part of a movement saving lives every day.',
      color: 'bg-pink-100',
      textColor: 'text-pink-600'
    },
    {
      icon: MapPin,
      title: 'Find Blood Nearby',
      description: 'Search for blood donors by blood group and location. Connect with donors instantly.',
      color: 'bg-rose-100',
      textColor: 'text-rose-600'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive blood donation solutions for donors, patients, and blood banks across the nation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 hover:translate-y-[-8px]"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${feature.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
