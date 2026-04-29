"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import { useLocale } from "@/contexts/LocaleContext";

export const Footer = () => {
  const { t } = useLocale();
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <img
              src="/images/ressources/nexa-pay-no-bg.png"
              alt="Nexa Logo"
              className="w-5 h-5 object-contain"
            />
            <h3 className="text-lg font-bold">Nexa</h3>
          </div>
          <p className="text-sm text-gray-400">
            {t.footer.subtitle}
          </p>
        </div>

        <Separator className="mb-8 bg-gray-800" />

        {/* Contact Section */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          <div>
            <h4 className="text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wide">
              {t.footer.contactLabel}
            </h4>
            <div className="grid gap-2">
              {t.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="text-xs text-white hover:text-blue-400 transition-colors"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-gray-800" />

        {/* Ownership & Copyright */}
        <div className="flex justify-between items-center space-y-4 text-center sm:text-left">
          <p className="text-sm text-gray-400">
            {t.footer.secured}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            © 2026 Nexa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
