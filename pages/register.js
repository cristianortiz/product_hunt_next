import React, { Fragment, useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit, Error } from "../components/ui/Form";
import useValidation from "./hooks/useValidation";
import validatesRegister from "./hooks/validation/validatesRegister";

//import firebase instance and FireBaseContext
import firebase from "../firebase";

//custom initial state of this component to use with useValidation hook
const INITIAL_STATE = {
  user_name: "",
  email: "",
  password: "",
};
const Register = () => {
  //local state to handle error in registerNewUser()
  const [error, setError] = useState(false);

  /* call props and functions of useValidation hook, and this component is passing custom 
  initial state,validationRegister rules and registerNewUser (as fn) to useValidation hook */
  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(INITIAL_STATE, validatesRegister, registerNewUser);

  //destructuring properties from values obj
  const { user_name, email, password } = values;

  //fn custom to register a new user in firebase
  async function registerNewUser() {
    try {
      await firebase.registerNewUser(user_name, email, password);
      Router.push("/");
    } catch (error) {
      console.error(
        "there is an error creating the new account",
        error.message
      );
      //update local state error
      setError(error.message);
    }
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
          <Form onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="user_name">Name</label>
              <input
                type="text"
                id="nombre"
                placeholder="your name"
                name="user_name"
                value={user_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.user_name && <Error> {errors.user_name}</Error>}
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error> {errors.email}</Error>}

            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="type a password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error> {errors.password}</Error>}

            {error && <Error> {error}</Error>}

            <InputSubmit type="submit" value="create account" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};
export default Register;
