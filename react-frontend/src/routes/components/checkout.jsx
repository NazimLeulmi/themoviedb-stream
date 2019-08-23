import React from "react";
import { Elements } from "react-stripe-elements";
import PaymentForm from "./paymentForm";

class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <PaymentForm />
      </Elements>
    );
  }
}

export default Checkout;
