"use client";

import React, { useEffect } from "react";
import Header from "../components/Header.jsx";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../Redux/Actions/cartActions.js";

const CartScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = params?.id;

  const qty = searchParams.get("qty");
  const sizes = searchParams.get("size");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) {
      dispatch(addToCart(productId, qty, sizes));
    }
  }, [dispatch, productId, qty, sizes]);

  const checkOutHandler = () => {
    if (!userInfo) {
      router.push("/login");
    } else {
      router.push("/shipping");
    }
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              href="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" href="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartitem */}
            {cartItems.map((item) => (
              <div className="cart-iterm row" key={item.product}>
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={160}
                    height={160}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link href={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>

                <div className="cart-qty col-md-2 col-sm-5 mt-md-4 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>Sizes</h6>
                  <h5>{item.sizes}</h5>
                </div>

                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>QUANTITY</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-12 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>PRICE</h6>
                  <h4>${(item.price * item.qty).toFixed(2)}</h4>
                </div>
              </div>
            ))}

            {/* End of cart items */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">${total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link href="/" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
