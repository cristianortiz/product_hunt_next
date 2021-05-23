import React, { Fragment } from "react";
import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit } from "../components/ui/form";
import useValidation from "./hooks/useValidation";
import validatesRegister from "./hooks/validation/validatesRegister";

const Register = () => {
  //custom initial state of this component to use the useValidation hook
  const INITIAL_STATE = {
    user_name: "",
    email: "",
    password: "",
  };
  /* call props and functions of useValidation hook, and this component is passing custom 
  initial state,validation rules and register (as fn) to useValidation hook */
  const { values, errors, submitForm, handleSubmit, handleChange } =
    useValidation(INITIAL_STATE, validatesRegister, registerNewUser);
  function registerNewUser() {
    console.log("...register a new account");
  }

  return (
    <div>
      <Layout>
        <Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 3rem;
            `}
          >
            Register a new account
          </h1>
          <Form>
            <Field>
              <label htmlFor="user_name">Name</label>
              <input
                type="text"
                id="nombre"
                placeholder="your name"
                name="user_name"
              />
            </Field>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your email"
                name="mail"
              />
            </Field>
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="type a password"
                name="password"
              />
            </Field>
            <InputSubmit type="submit" value="create account" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};
export default Register;
