import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Regular Donor',
      content: 'I have been donating blood regularly for 5 years. The process is safe, quick, and I feel amazing knowing I\'m saving lives.',
      rating: 5
    },
      {
      name: 'Priya Sharma',
      role: 'Patient\'s Family',
      content: 'When my mother needed urgent blood transfusion, Blood-Donation connected us with a donor within 2 hours. Absolutely amazing service!',
      rating: 5
    },
    {
      name: 'Dr. Amit Patel',
      role: 'Blood Bank Director',
      content: 'Blood-Donation has been instrumental in keeping our blood bank stocks adequate. Their donor network is reliable and professional.',
      rating: 5
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What People Say
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from donors, patients, and partners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                "{testimonial.content}"
              </p>

              <div>
                <p className="font-bold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-red-600 text-sm font-medium">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
