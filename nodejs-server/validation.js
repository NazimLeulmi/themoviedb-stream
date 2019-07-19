
// Auth Form Validation functions
let validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
let validateSignUp = (email, password, passwordc) => {
  let errors = { email: "", password: "", passwordc: "" }
  if (email === null || email === undefined || email === "") {
    errors.email = "the email is a required field";
  }
  else if (validateEmail(email) === false) {
    errors.email = "the email is invalid";
  }
  if (password === null || password === undefined || password === "") {
    errors.password = "the password is a required field"
  }
  else if (password.length < 8) {
    errors.password = "the password has to be at least 8 characters"
  }
  if (password !== "" && passwordc !== password) {
    errors.passwordc = "the two passwords must match";
  }
  if (errors.email + errors.password + errors.passwordc !== "") {
    return { isValid: false, errors };
  }
  return { isValid: true, errors };
}


let validateSignIn = (email, password) => {
  let errors = { email: "", password: "" }
  if (email === null || email === undefined || email === "") {
    errors.email = "the email is a required field";
  }
  else if (validateEmail(email) === false) {
    errors.email = "the email is invalid";
  }
  if (password === null || password === undefined || password === "") {
    errors.password = "the password is a required field"
  }
  if (errors.email + errors.password !== "") {
    return { isValid: false, errors };
  }
  return { isValid: true, errors };
}

module.exports = { validateSignIn, validateSignUp };