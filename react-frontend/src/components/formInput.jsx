import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

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
  font-size:18px;
  color:black;
  width:100%;
  height:100%;
  outline:0px;
  background:transparent;
  padding-left:15px;
  border-radius:5px;
  border:1px solid black;
`;

const IconStyle = { position: "absolute", right: 15 };

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
    <Icon color="rgba(8,28,3,.75)" icon={props.icon} style={IconStyle} />
  </Container>
)


export default FormInput;