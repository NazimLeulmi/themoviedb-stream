import React from 'react';
import styled from 'styled-components';
import image from "../assets/index.jpg";
import FormHeader from './formHeader';
import FormTxt from "./formTxt";
import FormInput from './formInput';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import FormBtn from './formBtn';
import FormFooter from './formFooter';

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
  justify-content:center;
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
const Reset = styled.p`
  width:80%;
  max-width:320px;
  margin:5px;
  color:rgb(8,28,36);
  font-family:Recoleta;
  text-align:right;
  cursor: pointer;
  z-index:2;
  font-size:18px;
`;

const Link = styled(Reset)`
  text-align:center;
  margin:15px;
  margin-bottom:140px;
  font-size:22px;
`;

const Error = styled.p`
  width:80%;
  max-width:320px;
  margin:5px;
  color:red;
  font-family:Roboto;
  text-align:left;
  z-index:2;
  font-size:16px;
`;

const AuthForm = (props) => (
  <Form>
    <Background />
    <FormHeader />
    <FormTxt login={props.login} />
    <FormInput type="email" value={props.email}
      placeholder="Email"
      icon={faEnvelope} name="email" handleInput={props.handleInput}
    />
    {props.errors.email !== "" && <Error>{props.errors.email}</Error>}
    <FormInput type="password" value={props.password}
      placeholder="Password"
      icon={faLock} name="password" handleInput={props.handleInput}
    />
    {props.errors.password !== "" && <Error>{props.errors.password}</Error>}
    {props.login ? <Reset>RESET PASSWORD</Reset> : null}
    {props.login === false ?
      <FormInput type="password" value={props.passwordc}
        placeholder="Password confirmation"
        icon={faLock} name="passwordc" handleInput={props.handleInput}
      /> : null
    }
    {props.errors.passwordc !== "" && <Error>{props.errors.passwordc}</Error>}
    <FormBtn login={props.login} submitForm={props.submitForm} />
    <Link onClick={props.nav}>
      {props.login ? "Create a free account" : "Sign in to my account"}
    </Link>
    <FormFooter />
  </Form>
)


export default AuthForm;