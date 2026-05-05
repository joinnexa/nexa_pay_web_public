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
  const { t, isRtl } = useLocale();
  const ctaSegments = [t.form.userTypeInvestor, t.form.userTypeConsumer, t.form.userTypeMerchant];
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    city: "Casablanca",
    user_type: "consumer",
    source: "nexa_pay_web_public",
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
        user_type: "consumer",
        source: "nexa_pay_web_public",
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
      <div className="bg-[#f3f4f6] dark:bg-[#050B18]">
        <section className="px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-20">
          <ScrollFade className="mx-auto max-w-[980px]">
            {/* Header */}
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(160deg,#0A1224_0%,#050B18_58%,#08152b_100%)] px-4 py-8 text-center shadow-[0_30px_80px_rgba(5,11,24,0.4)] sm:px-8 sm:py-10 md:py-12">
              <div className="pointer-events-none absolute -right-28 -top-28 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.46)_0%,rgba(59,130,246,0.22)_40%,rgba(59,130,246,0)_74%)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.3)_0%,rgba(37,99,235,0)_74%)] blur-2xl" />
              <div className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_65%_20%,rgba(59,130,246,0.09),transparent_32%),radial-gradient(circle_at_24%_82%,rgba(37,99,235,0.08),transparent_34%)]" />
              <p className="relative mb-3 text-[11px] font-extrabold tracking-[0.28em] text-[#cbd5e1]">LAUNCHING SOON</p>
              <h2 className="primary-heading !text-white">
                {t.form.title}
              </h2>
              <p className="secondary-heading !text-[#94A3B8]">
                {t.form.subtitle}
              </p>
              <div className="relative mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
                {ctaSegments.map((segment) => (
                  <span
                    key={segment}
                    className="rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-extrabold text-[#e9efff] transition-all hover:border-[#3B82F6]/80 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] sm:px-4 sm:text-sm"
                  >
                    {segment}
                  </span>
                ))}
              </div>
            

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-6 mt-5 rounded-lg p-3 text-start text-sm font-medium sm:text-base md:rounded-md md:p-4 ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Form */}
            <form
              className="space-y-5 pt-5 text-start md:space-y-5 md:pt-8"
              dir={isRtl ? "rtl" : "ltr"}
              onSubmit={handleSubmit}
            >
              {/* Full Name */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="full_name"
                  className="text-sm sm:text-base font-semibold text-[#e8f0ff]"
                >
                  {t.form.fullName} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder={t.form.fullNamePlaceholder}
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="h-14 rounded-2xl border-[#1e293b] bg-[#07111f] text-start text-white placeholder:text-[#94A3B8] focus-visible:border-[#3B82F6] focus-visible:ring-[3px] focus-visible:ring-[rgba(59,130,246,0.24)]"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="phone_number"
                  className="text-sm sm:text-base font-semibold text-[#e8f0ff]"
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
                  className="h-14 rounded-2xl border-[#1e293b] bg-[#07111f] text-start text-white placeholder:text-[#94A3B8] focus-visible:border-[#3B82F6] focus-visible:ring-[3px] focus-visible:ring-[rgba(59,130,246,0.24)]"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm sm:text-base font-semibold text-[#e8f0ff]"
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
                  className="h-14 rounded-2xl border-[#1e293b] bg-[#07111f] text-start text-white placeholder:text-[#94A3B8] focus-visible:border-[#3B82F6] focus-visible:ring-[3px] focus-visible:ring-[rgba(59,130,246,0.24)]"
                  required
                />
              </div>

              {/* City */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm sm:text-base font-semibold text-[#e8f0ff]"
                >
                  {t.form.city} <span className="text-red-500">*</span>
                </Label>
                <Select disabled defaultValue="Casablanca">
                  <SelectTrigger className="h-14 rounded-2xl border-[#1e293b] bg-[#07111f] text-start font-semibold text-white focus:ring-[3px] focus:ring-[rgba(59,130,246,0.24)]">
                    <SelectValue className="text-white data-[placeholder]:text-[#94A3B8]" placeholder={t.form.cityValue} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-[#1e293b] bg-[#0b1220] text-white">
                    <SelectItem
                      value="Casablanca"
                      className="focus:bg-white/10 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#2563EB] data-[state=checked]:to-[#3B82F6] data-[state=checked]:text-white"
                    >
                      {t.form.cityValue}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Type */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="user_type"
                  className="text-sm sm:text-base font-semibold text-[#e8f0ff]"
                >
                  {t.form.userType} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.user_type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, user_type: value }))
                  }
                >
                  <SelectTrigger
                    id="user_type"
                    className="h-14 rounded-2xl border-[#1e293b] bg-[#07111f] text-start font-semibold text-white focus:ring-[3px] focus:ring-[rgba(59,130,246,0.24)]"
                  >
                    <SelectValue className="text-white data-[placeholder]:text-[#94A3B8]" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-[#1e293b] bg-[#0b1220] text-white">
                    <SelectItem
                      value="consumer"
                      className="focus:bg-white/10 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#2563EB] data-[state=checked]:to-[#3B82F6] data-[state=checked]:text-white"
                    >
                      {t.form.userTypeConsumer}
                    </SelectItem>
                    <SelectItem
                      value="merchant"
                      className="focus:bg-white/10 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#2563EB] data-[state=checked]:to-[#3B82F6] data-[state=checked]:text-white"
                    >
                      {t.form.userTypeMerchant}
                    </SelectItem>
                    <SelectItem
                      value="investor"
                      className="focus:bg-white/10 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#2563EB] data-[state=checked]:to-[#3B82F6] data-[state=checked]:text-white"
                    >
                      {t.form.userTypeInvestor}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Usage */}
              <div className="space-y-1.5 md:space-y-2">
                <Label
                  htmlFor="how_will_use_nexa"
                  className="text-sm sm:text-base font-semibold text-[#e8f0ff]"
                >
                  {t.form.usage}
                </Label>
                <Textarea
                  id="how_will_use_nexa"
                  name="how_will_use_nexa"
                  placeholder={t.form.usagePlaceholder}
                  value={formData.how_will_use_nexa}
                  onChange={handleInputChange}
                  className="min-h-[118px] rounded-2xl border-[#1e293b] bg-[#07111f] text-start text-white placeholder:text-[#94A3B8] focus-visible:border-[#3B82F6] focus-visible:ring-[3px] focus-visible:ring-[rgba(59,130,246,0.24)] md:min-h-[120px]"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="h-[58px] w-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-center text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.45)] transition-all duration-200 hover:-translate-y-0.5 sm:text-base md:text-lg"
                disabled={isLoading}
              >
                {isLoading ? t.form.submitting : t.form.submit}
              </Button>

              {/* Privacy Note */}
              <p className="mt-4 text-center text-sm font-medium text-[#c9d3e4]">
                {t.form.privacy}
              </p>
            </form>
            </div>
          </ScrollFade>
        </section>
      </div>
    </Element>
  );
};
