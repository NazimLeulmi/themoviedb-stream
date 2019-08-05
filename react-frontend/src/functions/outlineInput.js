
const outlineInvalidInput = (errors, isLogin) => {
   const { email, password, passwordc } = errors;
   const emailInput = document.querySelector("input[name=email]");
   const passwordInput = document.querySelector("input[name=password]");

   if (email === null || email === "" || email === undefined) {
      emailInput.style.border = "none";
   } else {
      emailInput.style.border = "1px solid rgba(236, 100, 75, 1)";
   }
   if (password === null || password === "" || password === undefined) {
      passwordInput.style.border = "none";
   } else {
      passwordInput.style.border = "1px solid rgba(236, 100, 75, 1)";
   }



   if (isLogin === false) {
      const passwordcInput = document.querySelector("input[name=passwordc]");
      if (passwordc === null || passwordc === "" || passwordc === undefined) {
         passwordcInput.style.border = "none";
      } else {
         passwordcInput.style.border = "1px solid rgba(236, 100, 75, 1)";
      }
   }
}


export default outlineInvalidInput;