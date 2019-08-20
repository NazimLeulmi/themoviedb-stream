import React, { Component } from "react";
import "../assets/payment.css";
import Logo from "../assets/logo2.png";
import { User, CreditCard, Calendar, Lock } from "react-feather";
import paymentValidation from "../functions/paymentValidation";
import axios from "axios";
import isAuth from "../functions/checkAuth";


class PaymentForm extends Component {
  state = {
    currentPlan: "",
    plan: "",
    name: "",
    cardNumber: "",
    cardCsv: "",
    date: "",
    errors: { name: "", date: "" },
    authToken: ""
  };

  componentDidMount = async (e) => {
    // Check if the user is Authorised to access this route on the client

    const auth = await isAuth();
    if (auth !== true) {
      return this.props.history.push("/");
    }
    this.setState({ authToken: JSON.parse(localStorage.getItem("data")).token })
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitPayment = (e) => {
    // client side payment form input validation
    e.preventDefault();
    const { date, name } = this.state;
    const { isValid, errors } = paymentValidation(name, date);
    this.setState({ errors })
    const nameInput = document.querySelector("input[name=name]");
    const dateInput = document.querySelector("input[name=date]");
    if (errors.name !== "") {
      nameInput.style.border = "1px solid red";
    } else {
      nameInput.style.border = "0px";
    }
    if (errors.date !== "") {
      dateInput.style.border = "1px solid red";
    } else {
      dateInput.style.border = "0";
    }
    if (isValid === false) {
      console.log("Payment form inputs are invalid");
      return;
    }
    const expiration = date.split("/");
    const ExpirationYear = expiration[0];
    const ExpirationMonth = expiration[1];
    axios.post("http://localhost:3333/stripe", {
      name: name,
      number: '4242424242424242',
      exp_month: ExpirationMonth,
      exp_year: ExpirationYear,
      cvc: 255, authToken: this.state.authToken
    }).then(response => {
      const error = response.data.error ? response.data.error.param : null;
      console.log(error);
      if (error === "exp_year" || error === "exp_month") {
        this.setState({ errors: { date: "the expiration date is invalid" } })
        dateInput.style.border = "1px solid red";
      }
      console.log(response.data.token);
    }).catch(err => console.log(err))
  }
  render = () => {
    const { date, name, errors } = this.state;
    return (
      <div className="payment-container">
        <form className="payment-form">
          <img height="40" src={Logo} />
          <h1 className="payment-header"> Payment Form </h1>
          <label className="payment-text"> testing / development mode </label>
          <div className="form-group">
            <input className="form-input" type="text" name="name"
              spellCheck="false" autoCorrect="false"
              autoCapitalize="false" autoComplete="false"
              value={name}
              placeholder="Card Holder Name"
              onChange={this.handleInput}
            />
            <User size={20} color="#00D474" className="input-logo" />
          </div>
          {errors.name ? <label className="payment-text">{errors.name}</label> : null}
          <div className="form-group">
            <input className="form-input" type="text" name="cardNumber"
              spellCheck="false" autoCorrect="false"
              autoCapitalize="false" autoComplete="false"
              value={4242424242424242}
              placeholder="Card Number"
              onChange={this.handleInput}
            />
            <CreditCard size={20} color="#00D474" className="input-logo" />
          </div>
          <div className="form-group">
            <input className="form-input" type="text" name="cardCsv"
              spellCheck="false" autoCorrect="false"
              autoCapitalize="false" autoComplete="false"
              value={255}
              placeholder="Security Value"
              onChange={this.handleInput}
            />
            <Lock size={20} color="#00D474" className="input-logo" />
          </div>
          <div className="form-group">
            <input className="form-input" type="text" name="date"
              spellCheck="false" autoCorrect="false"
              autoCapitalize="false" autoComplete="false"
              value={date}
              placeholder="Expiration Date (YYYY/MM)"
              onChange={this.handleInput}
            />
            <Calendar size={20} color="#00D474" className="input-logo" />
          </div>
          {errors.date ? <label className="payment-text">{errors.date}</label> : null}
          <button className="payment-btn" onClick={this.submitPayment}>Pay</button>
          <button className="cancel-btn">CANCEL</button>
        </form>
      </div>
    )
  }
}

export default PaymentForm;
