import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.js";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="tex-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", heighht: "300px", objectFit: "contain" }}
            src="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
            alt="Not-found"
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
            <Link to="/" className="text-white text-decoration-none">
              Home page
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
