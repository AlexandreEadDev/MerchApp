import React from "react";
import Header from "./../components/Header.js";
import ShopSection from "./../components/homeComponents/ShopSection.js";
import ContactInfo from "../components/homeComponents/ContactInfo.js";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection.js";
import Footer from "./../components/Footer.js";
import { useParams } from "react-router";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  const { keyword } = useParams();
  const { pagenumber } = useParams();

  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
