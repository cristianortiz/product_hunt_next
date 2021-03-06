export default function validatesLogin(values) {
  //validations rules to Register form component
  let errors = {};

  //validates email
  if (!values.email) {
    errors.email = "email mandatory";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "the email is not valid";
  }

  //validates password
  if (!values.password) {
    errors.password = "password is mandatory";
  } else if (values.password.length < 6) {
    errors.password = "password must have 6 characters at least";
  }
  return errors;
}
