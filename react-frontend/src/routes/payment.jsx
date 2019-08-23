import React, { Component } from "react";
import "../assets/payment.css";
import Logo from "../assets/logo2.png";
import paymentValidation from "../functions/paymentValidation";
import axios from "axios";
import isAuth from "../functions/checkAuth";
import { StripeProvider } from "react-stripe-elements";
import Checkout from "./components/checkout";

const Payment = () => {
  return (
    <StripeProvider apiKey="pk_test_HhijrvetDgBCycZeFONI5rxm00NPr02HGO">
      <Checkout />
    </StripeProvider>
  );
};
export default Payment;
