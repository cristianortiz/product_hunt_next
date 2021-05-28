import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import SingleProduct from "../components/layout/SingleProduct";
import { FirebaseContext } from "../firebase";
import firebaseConfig from "../firebase/config";

const Home = () => {
  //state for products
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  //to
  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection("products")
        .orderBy("created_at", "desc")
        .onSnapshot(handleSnapshot);
    };
    getProducts();
  }, []);
  //firebase function to access and get data from firestore DB collection
  function handleSnapshot(snapshot) {
    const products_db = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    //add products from firestore to local state
    setProducts(products_db);
  }
  return (
    <div>
      <Layout>
        <div className="product-list">
          <div className="container">
            <div className="bg-white">
              {products.map((product) => (
                <SingleProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Home;
