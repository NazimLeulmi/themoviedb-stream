import React, { Component } from "react";
import validateAuthInputs from "../functions/validation";
import submitAuthForm from "../functions/postAuthForm";
import outlineInvalidInput from "../functions/outlineInput";
import isAuth from "../functions/checkAuth";
import AuthForm from "./components/authForm";



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
    // Check if the user is Authorised to access this route on the client
    if (await isAuth() === true) {
      return this.props.history.push("/movies");
    }
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


  submitForm = () => {
    const { email, password, passwordc, login } = this.state;
    // Form Input Validation
    const { isValid, errors } = validateAuthInputs(email, password,
      login ? null : passwordc);
    this.setState({ errors });
    outlineInvalidInput(errors, login);
    if (isValid === false) {
      return;
    }
    submitAuthForm(email, password, login ? null : passwordc)
      .then(data => {
        console.log("data", data)
        this.setState({ errors: data.errors });
        outlineInvalidInput(data.errors, login);
        if (data.auth && data.token) {
          localStorage.setItem("data", JSON.stringify({
            token: data.token,
            email: data.email,
            plan: data.plan
          }));
          if (data.firstLogin) {
            this.props.history.push("/pricing");
          } else {
            this.props.history.push("/movies");
          }
          return;
        }
        if (data.auth) {
          this.props.history.push("/notify");
          return;
        }
      })
      .catch(err => console.log(err));
  }

  navigate = (e) => {
    outlineInvalidInput({ email: "", password: "", passwordc: "" },
      this.state.login);
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
      <AuthForm />
    )
  }
}


export default Home;
