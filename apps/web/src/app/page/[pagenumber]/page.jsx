import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopSection from "@/components/homeComponents/ShopSection";

export default function Page({ params }) {
  return (
    <>
      <Header />
      <ShopSection pagenumber={params.pagenumber} />
      <Footer />
    </>
  );
}

