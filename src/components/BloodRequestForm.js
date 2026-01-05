import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, Heart, Loader } from 'lucide-react';

// Zod validation schema
const requestSchema = z.object({
  requesterName: z.string().min(2, 'Name must be at least 2 characters'),
  requesterPhone: z.string().min(10, 'Phone must be at least 10 digits'),
  requesterEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'Please select a valid blood group' })
  }),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  urgency: z.enum(['Critical', 'High', 'Moderate', 'Low']),
  hospitalName: z.string().min(2, 'Hospital name required').optional().or(z.literal('')),
  hospitalAddress: z.string().optional().or(z.literal('')),
  city: z.string().min(2, 'City is required'),
  medicalCondition: z.string().optional().or(z.literal('')),
});

const BloodRequestForm = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      quantity: 1,
      urgency: 'Moderate',
    },
  });

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.log('Location not available:', error.message)
      );
    }
  }, []);

  const onSubmit = async (data) => {
    setSubmitLoading(true);
    try {
      const payload = {
        ...data,
        quantity: parseInt(data.quantity),
        ...(userLocation && {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }),
      };

      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage('✅ Blood request submitted successfully!');
        reset();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert('Error: ' + (result.error || 'Failed to submit request'));
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Make sure backend is running.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'Critical', label: 'Critical (ASAP)', color: 'text-red-600' },
    { value: 'High', label: 'High (24 hours)', color: 'text-orange-600' },
    { value: 'Moderate', label: 'Moderate (48 hours)', color: 'text-yellow-600' },
    { value: 'Low', label: 'Low (Flexible)', color: 'text-green-600' },
  ];

  const urgencyValue = watch('urgency');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white drop-shadow-lg flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          Request Blood
        </h1>
        <p className="text-lg text-white/90 font-semibold drop-shadow-md">
          Submit a blood request and we'll help you find nearby donors
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-gradient-to-r from-green-600 to-green-700 border-2 border-green-400 rounded-xl p-6 text-white font-bold shadow-lg drop-shadow-md">
          ✓ {successMessage}
        </div>
      )}

      {/* Form Container */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-10 border-2 border-slate-700">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Requester Information Section */}
          <div className="border-b border-slate-600 pb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('requesterName')}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.requesterName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
                {errors.requesterName && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.requesterName.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('requesterPhone')}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.requesterPhone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
                {errors.requesterPhone && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.requesterPhone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  {...register('requesterEmail')}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.requesterEmail
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
                {errors.requesterEmail && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.requesterEmail.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  City *
                </label>
                <input
                  type="text"
                  {...register('city')}
                  placeholder="Enter your city"
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.city
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Blood Requirement Section */}
          <div className="border-b border-slate-600 pb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Blood Requirement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Blood Group *
                </label>
                <select
                  {...register('bloodGroup')}
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                    errors.bloodGroup
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                {errors.bloodGroup && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bloodGroup.message}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Quantity (Units) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register('quantity', { valueAsNumber: true })}
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                    errors.quantity
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
                {errors.quantity && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Urgency Level *
                </label>
                <select
                  {...register('urgency')}
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                    errors.urgency
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                >
                  {urgencyLevels.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.urgency && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.urgency.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Hospital Information Section */}
          <div className="border-b border-slate-600 pb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Hospital Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hospital Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Hospital Name (Optional)
                </label>
                <input
                  type="text"
                  {...register('hospitalName')}
                  placeholder="Enter hospital name"
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.hospitalName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
              </div>

              {/* Hospital Address */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Hospital Address (Optional)
                </label>
                <input
                  type="text"
                  {...register('hospitalAddress')}
                  placeholder="Enter hospital address"
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.hospitalAddress
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
              </div>

              {/* Medical Condition */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-2">
                  Medical Condition (Optional)
                </label>
                <textarea
                  {...register('medicalCondition')}
                  placeholder="Describe the medical condition (surgery, accident, etc.)"
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.medicalCondition
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-pink-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Urgency Alert */}
          {urgencyValue === 'Critical' && (
            <div className="bg-red-950/50 border border-red-600 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">Critical Blood Needed</p>
                <p className="text-red-200 text-sm">
                  Your request will be marked as critical. Nearby available donors will be
                  notified immediately.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitLoading}
              className="flex-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 disabled:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              {submitLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  Submit Blood Request
                </>
              )}
            </button>

            <button
              type="reset"
              onClick={() => reset()}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Clear
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-950/50 border border-blue-600 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              📍 Your location is being tracked to find the nearest donors. All information
              will be kept confidential and used only for this blood request.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodRequestForm;
