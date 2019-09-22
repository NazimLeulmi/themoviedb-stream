import React from 'react';
import styled from 'styled-components';
import image from "../../assets/index.jpg";
import FormHeader from './formHeader';
import FormTxt from "./formTxt";
import FormInput from './formInput';

export const clr = {
  white: "255,255,255",
  green: "1,210,119",
  darkBlue: "8,28,36",
  solitude: "232,240,255",
  hawkesBlue: "216,228,255"
}
const Form = styled.form`
  width:100vw;
  height:100vh;
  position:relative;
  background-color:rgb(${clr.solitude});
  display:flex;
  flex-direction:column;
  align-items:center;
  z-index:1;
`
const Background = styled.div`
  position:absolute;
  z-index:0;
  opacity: .15;
  width:100%;
  height:100%;
  background-image:url(${image});
  filter: blur(1px);
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
`;

const AuthForm = (props) => (
  <Form>
    <Background />
    <FormHeader />
    <FormTxt login={true} />
    <FormInput type="password" value="value"
      placeholder="Password" onChange={() => console.log("changing")}
      icon="Lock"
    />
  </Form>
)


export default AuthForm;