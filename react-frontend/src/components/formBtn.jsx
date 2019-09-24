import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width:80%;
  max-width:320px;
  min-height:45px;
  margin:5px;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(8,28,3,.75);
  color:white;
  cursor:pointer;
  border-radius:5px;
  font-family:Recoleta;
  font-weight:bold;
  font-size:20px;
  border:0px;
`

const FormBtn = (props) => (
  <Btn onClick={props.submitForm}>
    {props.login ? "SIGN IN" : "SIGN UP"}
  </Btn>
)


export default FormBtn