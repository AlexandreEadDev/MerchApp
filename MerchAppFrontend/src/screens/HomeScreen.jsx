import React from "react";
import Header from "../components/Header.jsx";
import ShopSection from "../components/homeComponents/ShopSection.jsx";
import ContactInfo from "../components/homeComponents/ContactInfo.jsx";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection.jsx";
import Footer from "../components/Footer.jsx";
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
