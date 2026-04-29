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
import { useLocale } from "@/contexts/LocaleContext";

export const JoinForm = () => {
  const { t } = useLocale();
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
    const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"}/api/v1/waitlist`;

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
        message: t.form.success,
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
            : t.form.genericError,
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
          <path className="fill-gray-100 dark:fill-[#070f1f]" d="M0,80V100H1000V30L0,80z"></path>
        </svg>
      </div>
      <div className="bg-gray-100 dark:bg-[#070f1f]">
        <section className="py-8 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8">
          <ScrollFade className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="primary-heading">
                {t.form.title}
              </h2>
              <p className="secondary-heading">
                {t.form.subtitle}
              </p>
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-3 md:p-4 rounded-lg md:rounded-md text-sm sm:text-base font-medium ${
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
                  className="text-sm sm:text-base font-semibold"
                >
                  {t.form.fullName} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder={t.form.fullNamePlaceholder}
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-[#101b31] dark:text-gray-100 dark:border-white/10"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="phone_number"
                  className="text-sm sm:text-base font-semibold"
                >
                  {t.form.phone} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder={t.form.phonePlaceholder}
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-[#101b31] dark:text-gray-100 dark:border-white/10"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm sm:text-base font-semibold"
                >
                  {t.form.email} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-[#101b31] dark:text-gray-100 dark:border-white/10"
                  required
                />
              </div>

              {/* City */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm sm:text-base font-semibold"
                >
                  {t.form.city} <span className="text-red-500">*</span>
                </Label>
                <Select disabled defaultValue="Casablanca">
                  <SelectTrigger className="bg-white dark:bg-[#101b31] dark:text-gray-100 dark:border-white/10">
                    <SelectValue placeholder={t.form.cityValue} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Casablanca">{t.form.cityValue}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Usage */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="how_will_use_nexa"
                  className="text-sm sm:text-base font-semibold"
                >
                  {t.form.usage}
                </Label>
                <Textarea
                  id="how_will_use_nexa"
                  name="how_will_use_nexa"
                  placeholder={t.form.usagePlaceholder}
                  value={formData.how_will_use_nexa}
                  onChange={handleInputChange}
                  className="min-h-[100px] md:min-h-[120px] bg-white dark:bg-[#101b31] dark:text-gray-100 dark:border-white/10"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base font-bold bg-[var(--dark-bg)] opacity-90 hover:opacity-100 text-white rounded-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? t.form.submitting : t.form.submit}
              </Button>

              {/* Privacy Note */}
              <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-300 mt-4">
                {t.form.privacy}
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
          <path className="fill-gray-100 dark:fill-[#070f1f]" d="M1000,0V-20H0V50L1000,0z"></path>
        </svg>
      </div>
    </Element>
  );
};
