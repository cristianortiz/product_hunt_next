import React from "react";
import Layout from "../components/layout/Layout";
import SingleProduct from "../components/layout/SingleProduct";

import useProducts from "./hooks/useProducts";

const Popular = () => {
  const { products } = useProducts("votes");
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
export default Popular;
