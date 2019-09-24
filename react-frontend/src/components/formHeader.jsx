import React from 'react';
import styled from 'styled-components';
import logo from "../assets/video-camera.png";

const Header = styled.h1`
    width:80%;
    height:75px;
    display:flex;
    font-family:Recoleta;
    font-weight:500;
    letter-spacing:2px;
    font-size:36px;
    justify-content:center;
    align-items:center;
    margin-top:10px;
    color:rgb("8,28,36");
`
const Logo = styled.img`
  height:40px;
  margin-right:10px;
`

const FormHeader = (props) => (
    <Header>
        <Logo src={logo} />
        AFLAMY
    </Header>
)


export default FormHeader;