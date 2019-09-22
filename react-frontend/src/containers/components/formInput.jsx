import React from 'react';
import styled from 'styled-components';
import { Lock } from "react-feather";

const Container = styled.div`
  width:80%;
  min-height:40px;
  margin:5px;
  position:relative;
  display:flex;
  align-items:center;
  margin-top:15px;
`;

const Input = styled.input`
  color:black;
  width:100%;
  height:100%;
  outline:0px;
  background:transparent;
  padding-left:15px;
  border-radius:5px;
  border:1px solid black;
`;

const IconStyle = { position: "absolute", right: 15 }

const FormInput = (props) => (
  <Container>
    <Input
      spellCheck="false" autoCorrect="false"
      autoCapitalize="false" autoComplete="false"
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
    {props.icon ? <props.icon size="25" color="gray" style={IconStyle} /> : null}
  </Container>
)


export default FormInput;