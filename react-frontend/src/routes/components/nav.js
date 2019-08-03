import React from "react";
import { NavLink } from 'react-router-dom'
import Logo from "../../assets/logo2.png";
const NavMenu = (props) => {
   return (
      <div className="nav-menu">
         <NavLink className="menu-link" to="#">TOP</NavLink>
         <NavLink className="menu-link" to="#">TRENDING</NavLink>
         <NavLink className="menu-link" to="#">UPCOMING</NavLink>
         <NavLink className="menu-link" to="/stared">MY MOVIES</NavLink>
         <NavLink style={{ color: "#00D474" }} className="menu-link" to="#">SIGN OUT</NavLink>
      </div>
   )
}

export default NavMenu;