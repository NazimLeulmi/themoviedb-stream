import React, { Component } from "react";
import Logo from "../assets/logo2.png";
// import "../assets/confirm.css";
import { Mail } from "react-feather";


export default class Notify extends Component {
   state = {
      confirmed: false,
   };
   render = () => (
      <div className="container">
         <div className="background" />
         <div className="header">
            <img src={Logo} alt="logo" width="85" />
            <Mail size={50} style={{ margin: 10 }} color="white" />
         </div>

         <p className="notify-text">
            Please verify your email address
         </p>
         <p className="notify-text" style={{ color: "#00d474" }}>
            nazim@ryanleulmi.com
          </p>
         <p className="notify-text">
            You need to activate your email. If you didn't receive the email, resend a new one by clicking the button below.
         </p>
         <p className="notify-text" style={{ marginBottom: 45 }}>
            Please check your email to activate your account
         </p>
         <button className="notify-btn">RESEND ACITIVISION EMAIL</button>
         <button style={{ background: "white", color: "#00d474" }} className="notify-btn">
            LOGIN
         </button>
      </div>
   )
}