import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import { registerDonor } from "../api/donorApi";

const donorRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  age: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((age) => age >= 18 && age <= 65, "Age must be between 18 and 65"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  bloodGroup: z.enum(
    ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    "Please select a blood group"
  ),
  city: z.string().min(2, "City is required"),
  lastDonationDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || new Date(val) <= new Date(),
      "Last donation date cannot be in the future"
    ),
  isAvailable: z.boolean().default(true),
});

const DonorRegistrationForm = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(donorRegistrationSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      // Map form data to API schema (using phone and city for backend compatibility)
      const donorData = {
        name: data.name,
        age: data.age,
        phone: data.phone,
        bloodGroup: data.bloodGroup,
        city: data.city,
        lastDonationDate: data.lastDonationDate || null,
        isAvailable: true,
      };

      const response = await registerDonor(donorData);

      if (response.success) {
        setSubmitStatus("success");
        reset();
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(response.message || "Registration failed. Please try again.");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message.includes("localhost:5000")
          ? "Cannot connect to backend server. Make sure it's running at http://localhost:5000"
          : error.message || "An unexpected error occurred. Please try again."
      );
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Hero Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl blur-2xl opacity-40"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl">💉</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white drop-shadow-lg mb-3">
            Become a Life Saver
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Join our community of blood donors and help save lives. Your donation can make a difference!
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mb-8 animate-bounce">
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-1 shadow-2xl">
              <div className="bg-slate-800 rounded-xl p-6 flex items-start space-x-4">
                <div className="text-4xl">🎉</div>
                <div>
                  <p className="font-bold text-xl text-white">Registration Successful!</p>
                  <p className="text-white/80 mt-1">Thank you for your generosity. We'll contact you very soon!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-8 animate-shake">
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 rounded-2xl p-1 shadow-2xl">
              <div className="bg-slate-800 rounded-xl p-6 flex items-start space-x-4">
                <div className="text-4xl">⚠️</div>
                <div>
                  <p className="font-bold text-xl text-white">Registration Failed</p>
                  <p className="text-white/80 mt-1">{errorMessage || "Please try again later."}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
          {/* Step 1: Personal Information */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-10 border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300">
              {/* Step Header */}
              <div className="flex items-center space-x-4 mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-50"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl">
                    1
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Personal Information</h2>
                  <p className="text-white/70 text-sm mt-1">Tell us about yourself</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="group/field">
                  <label className="block text-sm font-bold text-white mb-3 flex items-center space-x-2">
                    <span className="text-lg">👤</span>
                    <span>Full Name <span className="text-cyan-400">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name")}
                      className={`w-full px-5 py-4 bg-slate-700 border-2 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-500 outline-none transition-all duration-300 font-medium ${
                        errors.name ? "border-red-500" : "border-slate-600"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2 font-bold flex items-center space-x-1">
                      <span>❌</span>
                      <span>{errors.name.message}</span>
                    </p>
                  )}
                </div>

                {/* Age Field */}
                <div className="group/field">
                  <label className="block text-sm font-bold text-white mb-3 flex items-center space-x-2">
                    <span className="text-lg">🎂</span>
                    <span>Age <span className="text-cyan-400">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="25"
                      {...register("age")}
                      className={`w-full px-5 py-4 bg-slate-700 border-2 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-500 outline-none transition-all duration-300 font-medium ${
                        errors.age ? "border-red-500" : "border-slate-600"
                      }`}
                    />
                  </div>
                  {errors.age && (
                    <p className="text-red-400 text-sm mt-2 font-bold flex items-center space-x-1">
                      <span>❌</span>
                      <span>{errors.age.message}</span>
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="group/field">
                  <label className="block text-sm font-bold text-white mb-3 flex items-center space-x-2">
                    <span className="text-lg">📱</span>
                    <span>Phone Number <span className="text-cyan-400">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="9876543210"
                      {...register("phone")}
                      className={`w-full px-5 py-4 bg-slate-700 border-2 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-500 outline-none transition-all duration-300 font-medium ${
                        errors.phone ? "border-red-500" : "border-slate-600"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-2 font-bold flex items-center space-x-1">
                      <span>❌</span>
                      <span>{errors.phone.message}</span>
                    </p>
                  )}
                </div>

                {/* City Field */}
                <div className="group/field">
                  <label className="block text-sm font-bold text-white mb-3 flex items-center space-x-2">
                    <span className="text-lg">🏙️</span>
                    <span>City <span className="text-cyan-400">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Bangalore"
                      {...register("city")}
                      className={`w-full px-5 py-4 bg-slate-700 border-2 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-500 outline-none transition-all duration-300 font-medium ${
                        errors.city ? "border-red-500" : "border-slate-600"
                      }`}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-2 font-bold flex items-center space-x-1">
                      <span>❌</span>
                      <span>{errors.city.message}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-2 bg-gradient-to-r from-transparent via-slate-600 to-transparent my-8"></div>

          {/* Step 2: Medical Information */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-10 border-2 border-slate-700 hover:border-pink-500 transition-all duration-300">
              {/* Step Header */}
              <div className="flex items-center space-x-4 mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-lg opacity-50"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl">
                    2
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Medical Information</h2>
                  <p className="text-white/70 text-sm mt-1">Health and donation details</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Blood Group Field */}
                <div className="group/field">
                  <label className="block text-sm font-bold text-white mb-3 flex items-center space-x-2">
                    <span className="text-lg">🩸</span>
                    <span>Blood Group <span className="text-pink-400">*</span></span>
                  </label>
                  <div className="relative">
                    <select
                      {...register("bloodGroup")}
                      className={`w-full px-5 py-4 bg-slate-700 border-2 rounded-xl text-white focus:ring-4 focus:ring-pink-400/50 focus:border-pink-500 outline-none transition-all duration-300 font-medium appearance-none cursor-pointer ${
                        errors.bloodGroup ? "border-red-500" : "border-slate-600"
                      }`}
                    >
                      <option value="">Select your blood group</option>
                      <option value="O+">O+ (Universal Donor) ⭐</option>
                      <option value="O-">O- (Rh Negative)</option>
                      <option value="A+">A+</option>
                      <option value="A-">A- (Rh Negative)</option>
                      <option value="B+">B+</option>
                      <option value="B-">B- (Rh Negative)</option>
                      <option value="AB+">AB+ (Universal Recipient)</option>
                      <option value="AB-">AB- (Rh Negative)</option>
                    </select>
                    <div className="absolute right-5 top-4 pointer-events-none text-slate-400 font-bold">
                      ▼
                    </div>
                  </div>
                  {errors.bloodGroup && (
                    <p className="text-red-400 text-sm mt-2 font-bold flex items-center space-x-1">
                      <span>❌</span>
                      <span>{errors.bloodGroup.message}</span>
                    </p>
                  )}
                </div>

                {/* Last Donation Date Field */}
                <div className="group/field">
                  <label className="block text-sm font-bold text-white mb-3 flex items-center space-x-2">
                    <span className="text-lg">📅</span>
                    <span>Last Donation Date</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register("lastDonationDate")}
                      className={`w-full px-5 py-4 bg-slate-700 border-2 rounded-xl text-white focus:ring-4 focus:ring-pink-400/50 focus:border-pink-500 outline-none transition-all duration-300 font-medium ${
                        errors.lastDonationDate ? "border-red-500" : "border-slate-600"
                      }`}
                    />
                  </div>
                  {errors.lastDonationDate && (
                    <p className="text-red-400 text-sm mt-2 font-bold flex items-center space-x-1">
                      <span>❌</span>
                      <span>{errors.lastDonationDate.message}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="mt-12 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`relative group mx-auto block px-12 py-5 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl ${
                isLoading
                  ? "bg-slate-600 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 text-white hover:shadow-3xl hover:from-cyan-700 hover:via-blue-700 hover:to-cyan-700"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✓</span>
                    <span>Register as Donor</span>
                    <span className="text-2xl">❤️</span>
                  </>
                )}
              </div>
            </button>
            <p className="text-white/70 mt-6 text-sm font-medium">
              🔒 Your information is safe and secure with us
            </p>
          </div>
        </form>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 font-semibold mb-4">Help us save lives! One donation at a time. 🩸</p>
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse animation-delay-100"></div>
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse animation-delay-200"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};

export default DonorRegistrationForm;
