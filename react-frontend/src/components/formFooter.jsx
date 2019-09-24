import React from 'react';
import styled from 'styled-components';
import FreeIcon from "../assets/open-source.png";
import Github from "../assets/github.png";

const Footer = styled.a`
  width:100%;
  height:50px;
  position:absolute;
  bottom:0;
  color:rgb(8,28,36);
  border-top:1px solid rgb(8,28,36);
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(232,240,255,.55);
  cursor:pointer;
  text-decoration:none;
`
const Text = styled.p`
  color:rgb(8,28,36);
  font-family:Recoleta;
  margin:5px;
`;

const FormFooter = (props) => (
  <Footer href="https://github.com/NazimLeulmi/themoviedb-stream">
    <img alt="open-source" src={FreeIcon} height="20" />
    <Text>Copyright 2019  Nazim Leulmi</Text>
    <img alt="github" src={Github} height="20" />
  </Footer>
)


export default FormFooter