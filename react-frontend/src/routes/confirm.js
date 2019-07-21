import React, { Component } from "react";
import Logo from "../assets/logo2.png";
import "../assets/confirm.css";
import axios from "axios";


export default class Confirmation extends Component {
    state = {
        confirmed: false,
    };
    componentDidMount = () => {
        const { match: { params } } = this.props;
        console.log(params.token);
        axios.post("http://192.168.0.10:3333/confirm", {
            token: params.token
        })
            .then(response => {
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
            <div className="header">
                <img src={Logo} alt="logo" width="40" height="40" />
                <h5 style={{ color: "white", marginLeft: 5, fontSize: 20 }}>CONFIRMATION</h5>
            </div>
            {this.state.confirmed ? <p className="text">your account has been confirmed</p> :
                <p className="text">your token is invalid</p>
            }
        </div>
    )
}