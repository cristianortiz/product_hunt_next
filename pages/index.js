import React from "react";
import Layout from "../components/layout/Layout";
import SingleProduct from "../components/layout/SingleProduct";
import useProducts from "./hooks/useProducts";

const Home = () => {
  const { products } = useProducts("created_at");

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
