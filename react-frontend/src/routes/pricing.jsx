import React, { Component } from "react";
import axios from "axios";
import "../assets/pricing.css";
import Free from "../assets/free.png";
import Basic from "../assets/basic.png";
import Pro from "../assets/pro.png";
import isAuth from "../functions/checkAuth";


export default class Pricing extends Component {
  constructor(props) {
    super(props);
    const object = localStorage.getItem("data");
    if (object === null && object !== undefined) {
      return this.props.history.push("/");
    }
    // parse the json object from the string & destructure the object
    const { email, plan } = JSON.parse(object);
    this.state = { email, plan };
  }

  componentDidMount = async (e) => {
    // Check if the user is Authorised to access this route on the client
    if (await isAuth() !== true) {
      return this.props.history.push("/");
    }

  }

  handleClick = (plan, e) => {
    e.preventDefault();
    console.log("plan:", plan)
  }
  render = () => (
    <div className="pc-container">
      <div className="pricing-container">
        <div className="pricing">
          <h1 className="pricing-header">FREE</h1>
          <img width="65" src={Free} />
          <h1 className="price">0$/month</h1>
          <p className="field">
            <strong>Quality</strong>720p HD
          </p>
          <p className="field">
            <strong>Devices</strong>5
          </p>
          <p className="field">
            <strong>Users</strong>3
          </p>
          <p className="field">
            <strong>Movies</strong>10
          </p>
          <button className="sub-btn" onClick={this.handleClick.bind(this, "free")}>
            {this.state.plan === "free" ? "CONTINUE" : "CANCEL SUBSCRIPTION"}
          </button>
        </div>
        <div className="pricing">
          <h1 className="pricing-header">BASIC</h1>
          <img width="65" src={Basic} />
          <h1 className="price">15$/month</h1>
          <p className="field">
            <strong>Quality</strong>1080p FHD
          </p>
          <p className="field">
            <strong>Devices</strong>10
          </p>
          <p className="field">
            <strong>Users</strong>6
          </p>
          <p className="field">
            <strong>Movies</strong>unlimited
          </p>
          <button className="sub-btn" onClick={this.handleClick.bind(this, "basic")}>
            {this.state.plan === "basic" ? "CONTINUE" :
              this.state.plan === "premium" ? "DOWNGRADE" : "SUBSCRIBE"
            }
          </button>
        </div>
        <div className="pricing">
          <h1 className="pricing-header">PREMIUM</h1>
          <img width="65" src={Pro} />
          <h1 className="price">30$/month</h1>
          <p className="field">
            <strong>Quality</strong>2160p UHD
          </p>
          <p className="field">
            <strong>Devices</strong>unlimited
          </p>
          <p className="field">
            <strong>Users</strong>unlimited
          </p>
          <p className="field">
            <strong>Movies</strong>unlimited
          </p>
          <button className="sub-btn" onClick={this.handleClick.bind(this, "premium")}>
            {this.state.plan === "premium" ? "CONTINUE" : "SUBSCRIBE"}
          </button>
        </div>
      </div>
    </div>
  )
}
