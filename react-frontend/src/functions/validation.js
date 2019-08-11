
// Auth Form Validation functions
const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const validateAuthInputs = (email, password, passwordc) => {
  // Validation errors initial state
  let errors = { email: "", password: "", passwordc: "" };

  // Email Validation :-
  // Check if the email input field is empty
  if (email === null || email === undefined || email === "") {
    errors.email = "the email is a required field";
  }
  // Check the email's format
  else if (validateEmail(email) === false) {
    errors.email = "the email is invalid";
  }

  // Password Validation :-
  // Check if the password input field is empty
  if (password === null || password === undefined || password === "") {
    errors.password = "the password is a required field"
  }
  // Check if the password is too short on signUp
  else if (passwordc !== null && password.length < 8) {
    errors.password = "the password has to be at least 8 characters"
  }
  // OnSignUp only
  if (password !== "" && passwordc !== null && passwordc !== password) {
    errors.passwordc = "the two passwords must match";
  }
  if (errors.email + errors.password + errors.passwordc !== "") {
    return { isValid: false, errors };
  }
  return { isValid: true, errors };
}



module.exports = validateAuthInputs