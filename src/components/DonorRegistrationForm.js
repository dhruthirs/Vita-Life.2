import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

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
      // Map form data to API schema
      const donorData = {
        name: data.name,
        age: data.age,
        phone: data.phone,
        bloodGroup: data.bloodGroup,
        city: data.city,
        lastDonationDate: data.lastDonationDate || null,
        isAvailable: true,
      };

      // Register through auth context which handles backend call and auto-login
      const result = await registerAuth(donorData);

      if (result.success) {
        setSubmitStatus("success");
        reset();
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "Registration failed. Please try again.");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message?.includes("localhost:5000")
          ? "Cannot connect to backend server. Make sure it's running at http://localhost:5000"
          : error.message || "An unexpected error occurred. Please try again."
      );
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Donor Registration</h1>
        <p className="text-gray-700 mt-1">Register as a blood donor to help save lives</p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === "success" && (
        <div className="bg-green-100/90 border border-green-300 rounded-lg p-4 flex items-center space-x-3 backdrop-blur-sm">
          <CheckCircle className="text-green-700" size={24} />
          <div>
            <p className="font-semibold text-green-900">Registration Successful!</p>
            <p className="text-green-800 text-sm">You are now logged in! Redirecting to dashboard...</p>
            <p className="text-green-700 text-xs mt-1">📱 Your phone number ({registerAuth ? 'saved' : ''}) is your login password</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-100/90 border border-red-300 rounded-lg p-4 flex items-center space-x-3 backdrop-blur-sm">
          <AlertCircle className="text-red-700" size={24} />
          <div>
            <p className="font-semibold text-red-900">Registration Failed</p>
            <p className="text-red-800 text-sm">{errorMessage || "Please try again later."}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Personal Information Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your age (18-65)"
                  {...register("age")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.age && (
                  <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit phone number"
                  {...register("phone")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  {...register("city")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Medical Information Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Medical Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Group */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group <span className="text-red-600">*</span>
                </label>
                <select
                  {...register("bloodGroup")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${
                    errors.bloodGroup ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Blood Group</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                {errors.bloodGroup && (
                  <p className="text-red-600 text-sm mt-1">{errors.bloodGroup.message}</p>
                )}
              </div>

              {/* Last Donation Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Donation Date
                </label>
                <input
                  type="date"
                  {...register("lastDonationDate")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${
                    errors.lastDonationDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastDonationDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastDonationDate.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white text-lg transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 active:bg-red-800"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : (
                "Register as Donor"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonorRegistrationForm;
