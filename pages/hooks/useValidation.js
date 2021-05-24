import React, { useEffect, useState } from "react";

/* reusable custom hook to validates any form in the app, their initial state
 will be defined by the components also the rules validations and the fn function 
 but commons features will be defined here and imports by the components*/
const useValidation = (initialState, validate, fn) => {
  //user values state
  const [values, setValues] = useState(initialState);
  //errors state, their initial state is empty
  const [errors, setErrors] = useState({});
  //state to flag a form as submited, when user user submit any form in the app
  const [submitForm, setSubmitForm] = useState(false);

  //use effect to check and update the submitForm flag
  useEffect(() => {
    if (submitForm) {
      //chek for any errors in previous form validation when is submited
      const noErrors = Object.keys(errors).length === 0;

      if (noErrors) {
        //custom function executes in the component like register,login,newProduct etc
        fn();
      }
      //reset submited form flag
      setSubmitForm(false);
    }
  }, [errors]);

  //executes when user is typing in forms inputs
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //blur event, the user stop typing anf left the input
  const handleBlur = (e) => {
    //check for error in inputs form
    const validationErrors = validate(values);
    //add the previous errors in the errors state
    setErrors(validationErrors);
  };
  //executes when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    //check for error in inputs form
    const validationErrors = validate(values);
    //add the previous errors in the errors state
    setErrors(validationErrors);
    //the form is being submited so, the flag is true
    setSubmitForm(true);
  };
  //this hook returns this props to be called by other components
  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidation;
