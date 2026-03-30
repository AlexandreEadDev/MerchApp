"use client";

import React, { useEffect } from "react";
import Header from "../components/Header.jsx";
import DemoBanner from "../components/homeComponents/DemoBanner.jsx";
import HeroNike from "../components/homeComponents/HeroNike.jsx";
import FeaturedProducts from "../components/homeComponents/FeaturedProducts.jsx";
import ContactInfo from "../components/homeComponents/ContactInfo.jsx";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection.jsx";
import Footer from "../components/Footer.jsx";

const HomeScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <DemoBanner />
      <HeroNike />
      <FeaturedProducts />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
