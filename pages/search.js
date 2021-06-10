import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import useProducts from "./hooks/useProducts";
import { useRouter } from "next/router";
import SingleProduct from "../components/layout/SingleProduct";

const Search = () => {
  //to read the parameter 'q' send it through Search.js comp
  const router = useRouter();
  const {
    query: { q },
  } = router;
  //local state to handle and show the search results
  const [result, setResult] = useState([]);

  //use the custom hook to list all products
  const { products } = useProducts("created_at");

  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter((product) => {
      return (
        product.product_name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    });
    //set the local state for search result
    setResult(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className="product-list">
          <div className="container">
            <div className="bg-white">
              {result.map((product) => (
                <SingleProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
