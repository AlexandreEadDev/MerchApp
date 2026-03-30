"use client";

import { Provider } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import createStore from "@/Redux/store";

export default function Providers({ children }) {
  const [preloaded, setPreloaded] = useState(null);

  useEffect(() => {
    try {
      const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
      const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      const shippingAddress = localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {};

      setPreloaded({
        cart: { cartItems, shippingAddress },
        userLogin: { userInfo },
      });
    } catch {
      setPreloaded({});
    }
  }, []);

  const store = useMemo(() => createStore(preloaded || undefined), [preloaded]);

  return <Provider store={store}>{children}</Provider>;
}

