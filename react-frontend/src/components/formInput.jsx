import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width:80%;
  max-width:320px;
  min-height:45px;
  margin:5px;
  position:relative;
  display:flex;
  align-items:center;
  background:rgba(255,255,255,.35);
`;

const Input = styled.input`
  font-size:16px;
  font-family:Ubuntu;
  color:black;
  width:100%;
  height:100%;
  outline:0px;
  background:transparent;
  padding-left:15px;
  border-radius:5px;
  border:1px solid black;
`;


const FormInput = (props) => (
  <Container>
    <Input
      spellCheck="false" autoCorrect="false"
      autoCapitalize="false" autoComplete="false"
      type={props.type} name={props.name}
      placeholder={props.placeholder}
      onChange={props.handleInput}
      value={props.value}
    />
    {props.icon}
  </Container>
)


export default FormInput;