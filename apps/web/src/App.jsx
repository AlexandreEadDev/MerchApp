import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import SingleProduct from "./screens/SingleProduct.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import NotFound from "./screens/NotFounds.jsx";
import PrivateRoute from "./PrivateRouter.jsx";

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
