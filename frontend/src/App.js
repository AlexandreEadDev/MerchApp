import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.js";
import SingleProduct from "./screens/SingleProduct.js";
import Login from "./screens/Login.js";
import Register from "./screens/Register.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import CartScreen from "./screens/CartScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import NotFound from "./screens/NotFounds.js";
import PrivateRoute from "./PrivateRouter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/search/:keyword" element={<HomeScreen />} exact />
        <Route path="/page/:pagenumber" element={<HomeScreen />} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
          exact
        />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/order" element={<OrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
        </Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
