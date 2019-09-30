import React from 'react';
import styled from 'styled-components';
import image from "../assets/index.jpg";
import FormHeader from './formHeader';
import FormTxt from "./formTxt";
import FormInput from './formInput';
import FormBtn from './formBtn';
import FormFooter from './formFooter';
import { Mail, Lock } from "react-feather";

export const clr = {
  black: "11, 12, 16",
  darkblue: "32, 40, 51",
  lightgray: "197, 198, 200",
  lblue: "102, 252, 241",
  sky: "70, 162, 159"
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
  font-family:Ubuntu;
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
  text-align:right;
  cursor: pointer;
  z-index:2;
  font-size:16px;
`;

const Link = styled(Reset)`
  text-align:center;
  margin:15px;
  margin-bottom:140px;
  font-size:18px;
`;

const Error = styled.p`
  width:80%;
  max-width:320px;
  margin:5px;
  color:red;
  text-align:left;
  z-index:2;
  font-size:12px;
`;

const IconStyle = { position: "absolute", right: 15, color: "gray" };

const AuthForm = (props) => (
  <Form>
    <Background />
    <FormHeader />
    <FormTxt login={props.login} />
    <FormInput type="email" value={props.email}
      placeholder="Email"
      icon={<Mail style={IconStyle} />} name="email" handleInput={props.handleInput}
    />
    {props.errors.email !== "" && <Error>{props.errors.email}</Error>}
    <FormInput type="password" value={props.password}
      placeholder="Password"
      icon={<Lock style={IconStyle} />} name="password" handleInput={props.handleInput}
    />
    {props.errors.password !== "" && <Error>{props.errors.password}</Error>}
    {props.login ? <Reset>RESET PASSWORD</Reset> : null}
    {props.login === false ?
      <FormInput type="password" value={props.passwordc}
        placeholder="Password confirmation"
        icon={<Lock style={IconStyle} />} name="passwordc" handleInput={props.handleInput}
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