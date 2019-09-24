import React from "react";
import { injectStripe } from "react-stripe-elements";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "react-stripe-elements";
import "../assets/payment.css";
// import CardSection from "./";

class PaymentForm extends React.Component {
  handleSubmit = async ev => {
    ev.preventDefault();
    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    const { error } = await this.props.stripe.createToken({
      type: "card",
      name: "Jenny Rosen"
    });
    if (error) console.log(error);
    return;
  };

  render() {
    return (
      <div className="payment-container">
        <form className="payment-form" onSubmit={this.handleSubmit}>
          <CardNumberElement
            className="payment-input"
            style={{
              base: { fontSize: "14px", iconColor: "green" }
            }}
          />
          <CardExpiryElement
            style={{
              base: { fontSize: "14px", iconColor: "green", padding: 10 }
            }}
          />
          <CardCvcElement
            style={{
              base: { fontSize: "14px", iconColor: "green" }
            }}
          />
          <button>Confirm order</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
