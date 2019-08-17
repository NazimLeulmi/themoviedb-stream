
// Auth Form Validation functions
const validateExpirationDate = (date) => {
  const regex = /^[\d]{4}\/[\d]{2}$/;
  const isValid = regex.test(String(date));
  console.log("test",isValid)
  return isValid
}
const validatePayment = (name, date) => {
  // Validation errors initial state
  let errors = { date: "", name: "" };
  // Password Validation :-
  // Check if the password input field is empty
  if (date === null || date === undefined || date === "") {
    errors.date = "the expiration date is required"
  } else if (validateExpirationDate(date) === false) {
    errors.date = "Expiration date format is invalid";
    console.log("Expiration date is invalid");
  }
  if (name === null || name === undefined || name === "") {
    errors.name = "the card holder name is required"
  }
  if (errors.date + errors.name !== "") {
    return { isValid: false, errors };
  }
  return { isValid: true, errors };
}



module.exports = validatePayment;
