"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Header from "../components/Header.jsx";
import { savePaymentMethod } from "../Redux/Actions/cartActions.js";

const PaymentScreen = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!shippingAddress || !shippingAddress.address) {
      router.replace("/shipping");
    }
  }, [router, shippingAddress]);

  const [paymentMethodPaypal, setPaymentMethodPaypal] = useState("Paypal");
  // const [paymentMethodMasterCard, setPaymentMethodMasterCard] =
  //   useState("MasterCard");
  // const [paymentMethodVisa, setPaymentMethodVisa] = useState("Visa");

  // const dispatch = useDispatch();

  // // let findSelected = () => {
  // //   let selected = document.querySelector("input[name='payment']:checked");
  // //   dispatch(savePaymentMethod(selected));
  // // };

  const submitHandler = (e) => {
    e.preventDefault();
    // findSelected();
    dispatch(savePaymentMethod(paymentMethodPaypal));
    router.push("/placeorder");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                // defaultChecked
                type="radio"
                name="payment"
                className="form-check-input"
                value={paymentMethodPaypal}
                onChange={(e) => setPaymentMethodPaypal(e.target.value)}
              />
              Paypal
              <br />
              {/* <input
                type="radio"
                name="payment"
                className="form-check-input"
                value={paymentMethodMasterCard}
                onChange={(e) => setPaymentMethodMasterCard(e.target.value)}
              />
              MasterCard
              <br /> */}
              {/* <input
                className="form-check-input"
                type="radio"
                value={paymentMethodVisa}
                onChange={(e) => setPaymentMethodVisa(e.target.value)}
              /> */}
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
