import React, { Component } from "react";
import AuthForm from "../components/authForm";
import axios from "axios";



class Home extends Component {
  state = {
    login: true,
    registered: false,
    email: "",
    password: "",
    passwordc: "",
    errors: { email: "", password: "", passwordc: "" }
  }

  // Check if the client has a stored authentication token
  componentDidMount = async () => {
    console.log("Mounting Home");
    // Check if the user is Authorised to access this route on the client
    const res = await axios.get("http://192.168.42.208:3333/signIn/verify");
    if (res.data.auth) {
      this.props.history.push("/movies");
    }
  }

  handleInput = (e) => {
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { email, password, passwordc, login } = this.state;
    console.log("submiting the auth form")
    axios.post(`http://192.168.42.208:3333/sign${login ? "In" : "Up"}`, {
      email, password, passwordc: login ? null : passwordc
    })
      .then(res => {
        this.setState({ errors: res.data.errors }, () => {
          if (res.data.auth) {
            console.log("Signed In!!!")
            this.props.history.push("/movies");
          } else if (res.data.registered) {
            console.log("Signed Up!!!")
            this.navigate();
          }
        })
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  navigate = (e) => {
    this.setState({
      login: !this.state.login,
      registered: false,
      email: "",
      password: "",
      passwordc: "",
      errors: { email: "", password: "", passwordc: "" }
    })
  }
  render() {
    return (
      <AuthForm
        email={this.state.email}
        password={this.state.password}
        passwordc={this.state.passwordc}
        login={this.state.login}
        nav={this.navigate.bind(this)}
        handleInput={this.handleInput}
        submitForm={this.submitForm}
        errors={this.state.errors}
      />
    )
  }
}


export default Home;
