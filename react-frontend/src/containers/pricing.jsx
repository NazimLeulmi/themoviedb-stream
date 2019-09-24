import React, { Component } from "react";
import "../assets/pricing.css";
import Free from "../assets/free.png";
import Basic from "../assets/basic.png";
import Pro from "../assets/pro.png";

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

  componentDidMount = async e => {

  };

  handleClick = (plan, e) => {
    e.preventDefault();
    console.log("plan:", plan);
    console.log("what to do ??:", e.target.textContent);
    this.props.history.push({
      pathname: "/payment",
      state: { plan, action: e.target.textContent }
    });
  };
  render = () => (
    <div className="pc-container">
      <div className="pricing-container">
        <div className="pricing">
          <h1 className="pricing-header">FREE</h1>
          <img alt="free" width="65" src={Free} />
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
          <button
            className="sub-btn"
            onClick={this.handleClick.bind(this, "free")}
          >
            {this.state.plan === 0 ? "CONTINUE" : "CANCEL SUBSCRIPTION"}
          </button>
        </div>
        <div className="pricing">
          <h1 className="pricing-header">BASIC</h1>
          <img alt="basic" width="65" src={Basic} />
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
          <button
            className="sub-btn"
            onClick={this.handleClick.bind(this, "basic")}
          >
            {this.state.plan === 0
              ? "SUBSCRIBE"
              : this.state.plan === 1
                ? "CONTINUE"
                : "DOWNGRADE"}
          </button>
        </div>
        <div className="pricing">
          <h1 className="pricing-header">PREMIUM</h1>
          <img alt="premium" width="65" src={Pro} />
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
          <button
            className="sub-btn"
            onClick={this.handleClick.bind(this, "premium")}
          >
            {this.state.plan === 0
              ? "SUBSCRIBE"
              : this.state.plan === 2
                ? "UPGRADE"
                : "CONTINUE"}
          </button>
        </div>
      </div>
    </div>
  );
}
