import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex">
        <div className="card-name">
          <Image
            alt="mastercard"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
            width={120}
            height={72}
            style={{ width: "auto", height: "28px" }}
            unoptimized
          />
        </div>
        <div className="card-name">
          <Image
            alt="visa"
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            width={120}
            height={40}
            style={{ width: "auto", height: "28px" }}
            unoptimized
          />
        </div>
        <div className="card-name">
          <Image
            alt="paypal"
            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
            width={111}
            height={69}
            style={{ width: "auto", height: "28px" }}
            unoptimized
          />
        </div>
        <div className="card-name">
          <Image
            alt="express"
            src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
            width={96}
            height={96}
            style={{ width: "auto", height: "28px" }}
            unoptimized
          />
        </div>
        <div className="card-name">
          <Image
            alt="discover"
            src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Discover_Card_logo.svg"
            width={160}
            height={28}
            style={{ width: "auto", height: "28px" }}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
