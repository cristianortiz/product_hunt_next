import React, { Fragment, useContext, useState } from "react";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit, Error } from "../components/ui/Form";
import useValidation from "./hooks/useValidation";
import validatesNewProduct from "./hooks/validation/validatesNewProduct";

//import only FireBaseContext for firebase CRUD operations on products
import { FirebaseContext } from "../firebase";

//custom initial state of this component to use with useValidation hook
const INITIAL_STATE = {
  product_name: "",
  brand: "",
  image: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  //local state to handle error in addNewProduct()
  const [error, setError] = useState(false);
  //local state to handle file upload input
  const [image, setImage] = useState("");
  const [file_input, setFile] = useState("");

  /* call props and functions of useValidation hook, and this component is passing custom 
  initial state,validationRegister rules and addNewProduct (as fn) to useValidation hook */
  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(INITIAL_STATE, validatesNewProduct, addNewProduct);

  //destructuring properties from values obj
  const { product_name, brand, url, description } = values;

  //hook from next route to redirect
  const router = useRouter();
  //user data and firebase instance to CRUD ops for products in firebase
  const { user, firebase } = useContext(FirebaseContext);
  //fn custom to add a new product in firebase
  async function addNewProduct() {
    //if user is not authenticated
    if (!user) return router.push("/login");

    //create the product object to store in firebase
    const product = {
      product_name,
      brand,
      url,
      url_image: await uploadImage(),
      description,
      votes: 0, //data inputs entered by other users
      comments: [], //data inputs entered by other users
      created_at: Date.now(),
    };
    // setUrlImg(url_image);
    //add the new product to DB in firestore
    firebase.db.collection("products").add(product);
  }

  const handleFile = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };
  const uploadImage = async () => {
    //accesing array of files in upload
    const file = file_input;
    //collection in firestore to upload file
    const storageRef = await firebase.storage.ref("products");

    //set file name in firebase storage'
    const fileRef = storageRef.child(file.name);
    console.log(file.name);
    //uploading the file
    await fileRef.put(file);
    //add the file URL to state
    setImage(file.name);
    return await fileRef.getDownloadURL();
  };

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
            New Product
          </h1>
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <legend>General Info</legend>
              <Field>
                <label htmlFor="product_name">Product Name</label>
                <input
                  type="text"
                  id="product_name"
                  placeholder="product name"
                  name="product_name"
                  value={product_name}
                  onChange={handleChange}
                />
              </Field>
              {errors.product_name && <Error> {errors.product_name}</Error>}
              <Field>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  placeholder="type a brand"
                  name="brand"
                  value={brand}
                  onChange={handleChange}
                />
              </Field>
              {errors.brand && <Error> {errors.brand}</Error>}
              <Field>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  onChange={handleFile}
                />
              </Field>
              {errors.image && <Error> {errors.image}</Error>}
              <Field>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  placeholder="type a url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                />
              </Field>
              {errors.url && <Error> {errors.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>About your product</legend>

              <Field>
                <label htmlFor="description"></label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                ></textarea>
              </Field>
              {errors.description && <Error> {errors.description}</Error>}
            </fieldset>

            {error && <Error> {error}</Error>}
            <InputSubmit type="submit" value="Add Product" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};
export default NewProduct;
