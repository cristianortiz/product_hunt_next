import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
const useProducts = (order) => {
  //state for products
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  //to
  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection("products")
        .orderBy(order, "desc")
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
  return { products };
};
export default useProducts;
