import React, { Component } from "react";
import "../assets/home.css";
import { Mail, Lock } from "react-feather";
import Logo from "../assets/logo.png";
import axios from "axios";

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Home extends Component {
    state = {
        login: true,
        email: "",
        password: "",
        passwordc: "",
        errors: { email: "", password: "", passwordc: "" }
    }

    handleInput = (e) => {
        console.log(e.target.name)
        if (e.target.name === "email") {
            this.setState({ email: e.target.value })
        }
        else if (e.target.name === "password") {
            this.setState({ password: e.target.value })
        } else {
            this.setState({ passwordc: e.target.value })
        }
    }
    // Form Inputs Client Side Validation
    validate = () => {
        let errors = { email: "", password: "", passwordc: "" }
        if (validateEmail(this.state.email) === false) {
            errors.email = "the email is invalid";
        }
        if (this.state.password.length < 8) {
            errors.password = "the password has to be at least 8 characters"
        }
        if (!this.state.login && this.state.password !== this.state.passwordc) {
            errors.passwordc = "the two passwords must match";
        }
        if (errors.email + errors.password + errors.passwordc !== "") {
            this.setState({ errors: errors });
            return false;
        }
        return true;
    }

    submitForm = () => {
        if (this.validate() === true) {
            if (this.state.login) {
                // submit sign in form
                axios.post("http://localhost:3333/signin", {
                    email: this.state.email,
                    password: this.state.password,
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                // submit sign up form
                axios.post("http://localhost:3333/signup", {
                    email: this.state.email,
                    password: this.state.password,
                    passwordc: this.state.passwordc
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            console.log("Form Inputs are Invalid");
        }
    }

    navigate = (e) => {
        this.setState({
            login: !this.state.login,
            email: "",
            password: "",
            passwordc: "",
            errors: { email: "", password: "", passwordc: "" }
        })
    }

    render() {
        return (
            <div className="home-container">
                <div className="background" />
                <div className="login-form">
                    <div className="logo-container">
                        <img src={Logo} alt="logo" className="logo" />
                        <h1 className="form-header">MOVIESDB <i style={{ color: "#00D474" }}>STORE</i></h1>
                    </div>
                    <p className="form-text">
                        {this.state.login ?
                            "Type your email & password to start watching your favourite movies" :
                            "Type a valid email & password to create an account"
                        }

                    </p>
                    <div className="form-group">
                        <input className="form-input" type="email" name="email"
                            spellCheck="false" autoCorrect="false"
                            autoCapitalize="false" autoComplete="false"
                            value={this.state.email}
                            placeholder="Email"
                            onChange={this.handleInput}
                        />
                        <Mail size={20} color="#00D474" className="input-logo" />
                    </div>
                    {this.state.errors.email ? <p className="error">{this.state.errors.email}</p> : null}
                    <div className="form-group">
                        <input className="form-input" type="password" name="password"
                            spellCheck="false" autoCorrect="false"
                            autoCapitalize="false" autoComplete="false"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.handleInput}
                        />
                        <Lock size={20} color="#00D474" className="input-logo" />
                    </div>
                    {this.state.errors.password ? <p className="error">{this.state.errors.password}</p> : null}
                    {this.state.login === false ?
                        <div className="form-group">
                            <input className="form-input" type="password" name="passwordc"
                                spellCheck="false" autoCorrect="false"
                                autoCapitalize="false" autoComplete="false"
                                value={this.state.passwordc}
                                placeholder="Password Confirmation"
                                onChange={this.handleInput}
                            />
                            <Lock size={20} color="#00D474" className="input-logo" />
                        </div> : null
                    }
                    {this.state.errors.passwordc ? <p className="error">{this.state.errors.passwordc}</p> : null}
                    {this.state.login ?
                        <p className="form-text forget" name="forget">RESET THE PASSWORD</p> : null
                    }
                    <button className="form-btn" onClick={this.submitForm} style={{
                        backgroundColor: this.state.login ? "#00D474" : "white",
                        color: this.state.login ? "white" : "black"
                    }}>
                        SIGN {this.state.login ? "IN" : "UP"}
                    </button>
                    <p className="form-text" onClick={this.navigate} name="nav-text">
                        {this.state.login ? "Don't" : "Already"} have an account?
                        <i className="nav-link">SIGN {this.state.login ? "UP" : "IN"}</i>
                    </p>
                </div>
            </div>
        )
    }
}


export default Home;