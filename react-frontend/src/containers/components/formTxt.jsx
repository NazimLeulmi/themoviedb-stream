import React from 'react';
import styled from 'styled-components';

const Text = styled.h1`
  width:80%;
  font-family:Roboto;
  font-size:20px;
  margin-top:20px;
  color:rgb("8,28,36");
  text-align:center;
  line-height:22px;
`

const FormTxt = (props) => (
  <Text>
    {props.login ?
      "Type your email & password to start watching your favourite movies" :
      "Type a valid email & password to create an account"
    }
  </Text>
)


export default FormTxt