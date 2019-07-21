import React, { Component } from "react";
import "../assets/home.css";
import { Mail, Lock } from "react-feather";
import Logo from "../assets/logo.png";
import { validateSignUp, validateSignIn } from "../functions/validation";



class Home extends Component {
   state = {
      login: true,
      registered: false,
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


   submitForm = () => {
      const { email, password, passwordc } = this.state;
      const { isValid, errors } = validateSignUp(email, password, passwordc);
      console.log("isValid?: ", isValid);
      console.log("errors?: ", errors);

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
         <div className="home-container">
            <div className="background" />
            <div className="login-form">
               <div className="logo-container">
                  <img src={Logo} alt="logo" className="logo" />
                  <h1 className="form-header">MOVIESDB <i style={{ color: "#00D474" }}>STREAM</i></h1>
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
               {this.state.registered ? <p className="form-text">the confirmation email has been sent</p> : null}
               <button className="form-btn" onClick={this.submitForm} style={{
                  backgroundColor: this.state.login ? "#00D474" : "white",
                  color: this.state.login ? "white" : "black"
               }}>
                  SIGN {this.state.login ? "IN" : "UP"}
               </button>
               <p className="form-text" onClick={this.navigate} name="nav-text">
                  {this.state.login ? "Don't" : "Already"} have an account?
                  <i className="nav-link" title={this.state.login ? "create an account" : "use my account"}>
                     SIGN {this.state.login ? "UP" : "IN"}
                  </i>
               </p>
            </div>
         </div>
      )
   }
}


export default Home;