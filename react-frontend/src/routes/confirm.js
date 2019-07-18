import React, { Component } from "react";
import Logo from "../assets/logo2.png";
import "../assets/confirm.css";
import axios from "axios";


export default class Confirmation extends Component {
    state = {
        email: "",
        failed: false,
    };
    componentDidMount = () => {
        const { match: { params } } = this.props;
        console.log(params.token);
        axios.post("http://192.168.0.10:3333/confirm", {
            token: params.token
        })
            .then(response => {
                if (response.data.email) {
                    this.setState({ email: response.data.email });
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 2500);
                } else {
                    this.setState({ failed: true });
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
            <div className="header">
                <img src={Logo} alt="logo" width="40" height="40" />
                <h5 style={{ color: "white", marginLeft: 5, fontSize: 20 }}>CONFIRMATION</h5>
            </div>
            {this.state.failed ? <p className="text">failed to confirm your account</p> : null}
            {this.state.email ? <p className="text">{this.state.email} has been confirmed </p> : null}
        </div>
    )
}