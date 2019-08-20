import React from "react";
import { NavLink } from 'react-router-dom'
import axios from "axios";
const NavMenu = (props) => {
   const signOut = () => {
      console.log("SIGNING OUT");
      const object = localStorage.getItem("data");
      if (object == null || object === undefined) {
         props.history.push("/");
      }
      const { token } = JSON.parse(object);
      axios.post("http://localhost:3333/signIn/signOut", { token })
         .then(res => {
            if (res.data.out === true) {
               console.log(res.data.out);
               localStorage.removeItem("data");
               props.history.push("/");
               return;
            }
         })
   }
   return (
      <div className="nav-menu">
         <NavLink className="menu-link" to="#">TOP</NavLink>
         <NavLink className="menu-link" to="#">TRENDING</NavLink>
         <NavLink className="menu-link" to="#">UPCOMING</NavLink>
         <NavLink className="menu-link" to="/stared">MY MOVIES</NavLink>
         <NavLink
            style={{ color: "#00D474" }}
            className="menu-link" to="#"
            onClick={signOut}
         >
            SIGN OUT
         </NavLink>

      </div>
   )
}

export default NavMenu;