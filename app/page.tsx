"use client";

import React from "react";
import { HeroSection } from "./home/sections/hero/Hero";
import { Footer } from "@/components/footer/Footer";
import { AboutSection } from "./home/sections/about/About";
import { AccessSection } from "./home/sections/access/Access";
import { TrustSefetySection } from "./home/sections/trust-safety/TrustSefety";
import { JoinForm } from "./home/sections/join-form/JoinForm";
import { NavBar } from "@/components/navbar/NavBar";
import { WhyWeExist } from "./home/sections/why-we-exists/WhyWeExist";
import { AdvantagesSection } from "./home/sections/advantages/Advantages";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <WhyWeExist />
      <AboutSection />
      <AdvantagesSection />
      <AccessSection />
      <JoinForm />
      <TrustSefetySection />
      <Footer />
    </>
  );
}
