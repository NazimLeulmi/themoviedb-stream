import React, { Component } from "react";
import "../assets/payment.css";
import {User,CreditCard,Calendar,Lock} from "react-feather";


class PaymentForm extends Component {
  state = {
    name:"",
    cardNumber:"",
    cardCsv:"",
    cardExpMonth:"",
    cardExpYear:""
  };

  handleInput = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  render = () =>{
    const {cardNumber,cardCsv,cardExpMonth,
           cardExpYear,name} = this.state;
    return(
      <div className="payment-container">
        <form className="payment-form">
          <h1 className="payment-header"> Payment Form </h1>
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
          <div className="form-group">
            <input className="form-input" type="text" name="cardNumber"
                   spellCheck="false" autoCorrect="false"
                   autoCapitalize="false" autoComplete="false"
                   value={cardNumber}
                   placeholder="Card Number"
                   onChange={this.handleInput}
                   />
            <CreditCard size={20} color="#00D474" className="input-logo" />
          </div>
          <div className="form-group">
            <input className="form-input" type="text" name="card-csv"
                   spellCheck="false" autoCorrect="false"
                   autoCapitalize="false" autoComplete="false"
                   value={cardCsv}
                   placeholder="Security Value"
                   onChange={this.handleInput}
                   />
            <Lock size={20} color="#00D474" className="input-logo" />
          </div>
          <div className="form-group">
            <input className="form-input" type="text" name="card-exp-month"
                   spellCheck="false" autoCorrect="false"
                   autoCapitalize="false" autoComplete="false"
                   value={cardExpMonth}
                   placeholder="Expiration Month"
                   onChange={this.handleInput}
                   />
            <Calendar size={20} color="#00D474" className="input-logo" />
          </div>
          <div className="form-group">
            <input className="form-input" type="text" name="card-exp-year"
                   spellCheck="false" autoCorrect="false"
                   autoCapitalize="false" autoComplete="false"
                   value={cardExpMonth}
                   placeholder="Expiration Year"
                   onChange={this.handleInput}
                   />
            <Calendar size={20} color="#00D474" className="input-logo" />
          </div>
          <button className="payment-btn">Pay</button>
        </form>
      </div>
    )}
}

export default PaymentForm;
