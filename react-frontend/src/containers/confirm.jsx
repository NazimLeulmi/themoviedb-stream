import React, { Component } from "react";
import "../assets/confirm.css";
import axios from "axios";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default class Confirmation extends Component {
  state = {
    confirmed: false,
  };
  componentDidMount = () => {
    const { match: { params } } = this.props;
    console.log(params.token);
    axios.post("http://192.168.42.208:3333/signUp/confirm", {
      token: params.token
    })
      .then(response => {
        console.log(response.data)
        if (response.data.confirmed === true) {
          this.setState({ confirmed: true });
          setTimeout(() => {
            this.props.history.push('/')
          }, 2500);
        } else {
          this.setState({ confirmed: false });
          setTimeout(() => {
            this.props.history.push('/')
          }, 2500);
        }
      })
      .catch(error => {
        console.log(error);
      });

  }
  render = () => (
    <div className="container">
      <div className="background" />
      <Icon size={50} style={{ margin: 10 }}
        color="white" icon={this.state.confirmed ? "user-check" : "user0times"} />
      <p className="notify-text">
        {this.state.confirmed ?
          "Your account has been activated" : "Your confirmation token is invalid"
        }
      </p>
    </div>
  )
}
