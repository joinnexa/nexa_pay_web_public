"use client";

import React from "react";
import { HeroSection } from "./home/sections/hero/Hero";
import Footer from "@/components/footer/Footer";
import { AboutSection } from "./home/sections/about/About";
import { AccessSection } from "./home/sections/access/Access";
import { TrustSefetySection } from "./home/sections/trust-safety/TrustSefety";
import { JoinForm } from "./home/sections/join-form/JoinForm";
import { NavBar } from "@/components/navbar/NavBar";
import { WhyWeExist } from "./home/sections/why-we-exists/WhyWeExist";
import { AdvantagesSection } from "./home/sections/advantages/Advantages";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { SegmentsSection } from "./home/sections/segments/Segments";
import { PillarsSection } from "./home/sections/pillars/Pillars";
import { RoadmapSection } from "./home/sections/roadmap/Roadmap";

export default function HomePage() {
  return (
    <LocaleProvider>
      <NavBar />
      <HeroSection />
      <WhyWeExist />
      <AboutSection />
      <AdvantagesSection />
      <PillarsSection />
      <SegmentsSection />
      <AccessSection />
      <RoadmapSection />
      <JoinForm />
      <TrustSefetySection />
      <Footer />
    </LocaleProvider>
  );
}
