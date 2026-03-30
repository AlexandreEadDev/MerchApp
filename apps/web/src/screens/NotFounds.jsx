import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header.jsx";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="tex-center mb-2 mb-sm-5">Page Not Found</h4>
          <Image
            src="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
            alt="Not-found"
            width={1200}
            height={300}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            unoptimized
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
            <Link href="/" className="text-white text-decoration-none">
              Home page
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
