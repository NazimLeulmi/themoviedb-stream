import React from "react";
import "../assets/payment.css";
import { StripeProvider } from "react-stripe-elements";
import Checkout from "../components/checkout";

const Payment = () => {
  return (
    <StripeProvider apiKey="pk_test_HhijrvetDgBCycZeFONI5rxm00NPr02HGO">
      <Checkout />
    </StripeProvider>
  );
};
export default Payment;
