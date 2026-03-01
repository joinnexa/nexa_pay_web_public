"use client";

import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Element } from "react-scroll";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollFade } from "@/components/animations/ScrollFade";

export const JoinForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    city: "Casablanca",
    how_will_use_nexa: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const submittingRef = useRef(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string | string[];
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async () => {
    const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002"}/api/v1/waitlist`;

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || "Failed to submit form";
      throw new Error(
        typeof errorMessage === "string"
          ? errorMessage
          : errorMessage.join(", "),
      );
    }

    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await submitForm();
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your request has been submitted successfully.",
      });
      // Reset form on success
      setFormData({
        full_name: "",
        phone_number: "",
        email: "",
        city: "Casablanca",
        how_will_use_nexa: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <Element id="joinForm">
      <div className="" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path className="fill-gray-100" d="M0,80V100H1000V30L0,80z"></path>
        </svg>
      </div>
      <div className="bg-gray-100">
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <ScrollFade className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="primary-heading">
                Request Early Access
              </h2>
              <p className="secondary-heading">
                Join the waitlist to be considered for Nexa Pay’s private beta in Morocco.
              </p>
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-3 md:p-4 rounded-lg md:rounded-md text-xs sm:text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Form */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="full_name"
                  className="text-xs sm:text-sm md:text-base"
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="bg-white"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="phone_number"
                  className="text-xs sm:text-sm md:text-base"
                >
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="06XXXXXXXX"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs sm:text-sm md:text-base"
                >
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white"
                  required
                />
              </div>

              {/* City */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="city"
                  className="text-xs sm:text-sm md:text-base"
                >
                  City <span className="text-red-500">*</span>
                </Label>
                <Select disabled defaultValue="Casablanca">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Casablanca">Casablanca</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Usage */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="how_will_use_nexa"
                  className="text-xs sm:text-sm md:text-base"
                >
                  How will you use Nexa Pay? (Optional)
                </Label>
                <Textarea
                  id="how_will_use_nexa"
                  name="how_will_use_nexa"
                  placeholder="Tell us how you plan to use Nexa Pay..."
                  value={formData.how_will_use_nexa}
                  onChange={handleInputChange}
                  className="min-h-[100px] md:min-h-[120px] bg-white"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base font-medium bg-[var(--dark-bg)] opacity-90 hover:opacity-100 text-white rounded-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Request Early Access"}
              </Button>

              {/* Privacy Note */}
              <p className="text-center text-xs text-gray-600 mt-4">
                We only use your information to contact you about beta access and product updates.
              </p>
            </form>
          </ScrollFade>
        </section>
      </div>
      <div className="" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -20 1000 100"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path className="fill-gray-100" d="M1000,0V-20H0V50L1000,0z"></path>
        </svg>
      </div>
    </Element>
  );
};
