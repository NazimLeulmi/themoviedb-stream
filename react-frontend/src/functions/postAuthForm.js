import axios from "axios";
// Post Request {email,password,passwordc?} => 
const submitAuthForm = (email, password, passwordc) => {
   let isLogin = true;
   if (passwordc !== null && passwordc !== undefined && passwordc !== "") {
      isLogin = false;
   }
   return axios.post(`http://192.168.0.14:3333/sign${isLogin ? "In" : "Up"}`, {
      email, password,
      passwordc: isLogin ? null : passwordc
   })
      .then(response => {
         console.log(response);
         return response.data
      })
      .catch(function (error) {
         console.log(error);
         return null
      });
}

export default submitAuthForm;