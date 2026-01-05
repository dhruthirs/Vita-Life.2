import React, { useEffect, useState } from 'react';
import { Heart, Droplet, Users, Trophy } from 'lucide-react';

const StatsSection = () => {
  const [stats, setStats] = useState({
    bloodUnits: 0,
    livesSaved: 0,
    activeDonors: 0,
    campsOrganized: 0,
  });

  useEffect(() => {
    // Animate stats on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate to target values
          animateCount();
        }
      });
    });
    
    const element = document.querySelector('.stats-container');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const animateCount = () => {
    const targets = {
      bloodUnits: 128500,
      livesSaved: 385500,
      activeDonors: 2850,
      campsOrganized: 1446,
    };

    let current = { bloodUnits: 0, livesSaved: 0, activeDonors: 0, campsOrganized: 0 };
    const interval = setInterval(() => {
      let allDone = true;
      for (let key in current) {
        if (current[key] < targets[key]) {
          const increment = Math.ceil(targets[key] / 100);
          current[key] = Math.min(current[key] + increment, targets[key]);
          allDone = false;
        }
      }
      setStats({ ...current });
      if (allDone) clearInterval(interval);
    }, 30);
  };

  const statItems = [
    { icon: Droplet, value: stats.bloodUnits, label: 'Blood Units Collected', color: 'bg-red-100', iconColor: 'text-red-600' },
    { icon: Heart, value: stats.livesSaved, label: 'Lives Saved', color: 'bg-pink-100', iconColor: 'text-pink-600' },
    { icon: Users, value: stats.activeDonors, label: 'Active Donors', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: Trophy, value: stats.campsOrganized, label: 'Camps Organized', color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Impact So Far
          </h2>
          <p className="text-lg text-gray-600">
            Together, we're making a difference in lives across the nation
          </p>
        </div>

        <div className="stats-container grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:translate-y-[-8px]"
              >
                {/* Background glow */}
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${item.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${item.iconColor}`} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-4xl md:text-5xl font-bold text-gray-900">
                      {formatNumber(item.value)}
                      <span className="text-2xl">+</span>
                    </p>
                    <p className="text-gray-600 font-medium">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional impact message */}
        <div className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-lg text-gray-700">
            <span className="font-bold text-red-600">2% of India's youth</span> donating regularly can solve blood shortage forever. 
            <span className="font-bold text-red-600 ml-2">Be the change!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
