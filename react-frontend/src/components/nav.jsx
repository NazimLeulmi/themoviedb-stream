import React from "react";
import styled from "styled-components";
import { clr } from "./authForm";

const NavBar = styled.nav`
   width:100%;
   height:75px;
   border-bottom:1px solid rgb(${clr.sky});
   background:rgb(${clr.darkblue});
   position:fixed;
   top:0;
   z-index:2;
`;

const NavMenu = (props) => (
   <NavBar />
)

export default NavMenu;