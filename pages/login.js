import React, { Fragment, useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit, Error } from "../components/ui/Form";
import useValidation from "./hooks/useValidation";
import validatesLogin from "./hooks/validation/validatesLogin";

//import firebase instance and FireBaseContext
import firebase from "../firebase";

//custom initial state of this component to use with useValidation hook
const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = () => {
  //local state to handle error in loginUser()
  const [error, setError] = useState(false);

  /* call props and functions of useValidation hook, and this component is passing custom 
  initial state,validationRegister rules and loginUser (as fn) to useValidation hook */
  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(INITIAL_STATE, validatesLogin, loginUser);

  //destructuring properties from values obj
  const { email, password } = values;

  //fn custom to register a new user in firebase
  async function loginUser() {
    try {
      await firebase.loginUser(email, password);
      Router.push("/");
    } catch (error) {
      console.error("there is an error login the user", error.message);
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
            Login
          </h1>
          <Form onSubmit={handleSubmit}>
            {errors.email && <Error> {errors.email}</Error>}
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Field>
            {errors.password && <Error> {errors.password}</Error>}
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="type a password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Field>

            {error && <Error> {error}</Error>}

            <InputSubmit type="submit" value="Login" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};
export default Login;
