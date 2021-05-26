export default function validatesNewProduct(values) {
  //validations rules to Register form component
  let errors = {};

  //validates products name
  if (!values.product_name) {
    errors.product_name = "product name is mandatory";
  }

  //validates products name
  if (!values.brand) {
    errors.brand = "brand name is mandatory";
  }

  /* //validates products name
  if (!values.image) {
    errors.image = "image is mandatory";
  }
 */
  //validates products name
  if (!values.url) {
    errors.url = "url is mandatory";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "the url is not valid";
  }

  //validates products name
  if (!values.description) {
    errors.description = "description is mandatory";
  }

  return errors;
}
