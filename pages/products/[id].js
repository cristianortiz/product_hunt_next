import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { formatDistanceToNow } from "date-fns";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Field, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 1rem;
  }
`;

const ProductDetail = () => {
  //local state to handle product data from FireStore DB
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  //routing to get the actual product id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //firebase context
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    if (id) {
      const getProductDB = async () => {
        const product_query = await firebase.db.collection("products").doc(id);
        const product_db = await product_query.get();
        if (product_db.exists) {
          //update local state whit the product info from firestore
          setProduct(product_db.data());
        } else {
          setError(true);
        }
      };
      getProductDB();
    }
  }, [id]);
  //meanwhile the prpduct info is loaded from firestore, could use a spinner too
  if (Object.keys(product).length === 0) return "Loading...";
  const {
    brand,
    comments,
    created_at,
    created_by,
    product_name,
    description,
    url,
    url_image,
    votes,
  } = product;
  return (
    <Layout>
      <>
        {error && <Error404 />}
        <div className="container">
          <h1
            css={css`
              text-align: center;
              margin-top: 3rem;
            `}
          >
            {product_name}
          </h1>
          <ProductContainer>
            <div>
              <p>Posted {formatDistanceToNow(new Date(created_at))} ago</p>
              <p>
                By {created_by.user_name} from <b>{brand}</b>
              </p>
              <img src={url_image} />
              <p>{description}</p>
              <h2>Add a comment</h2>
              <form>
                <Field>
                  <input type="text" name="msg"></input>
                </Field>
                <InputSubmit type="submit" value="Add comment"></InputSubmit>
              </form>
              <h2
                css={css`
                  margin-top: 2rem;
                `}
              >
                Comments
              </h2>
              {comments.map((comment) => (
                <li>
                  <p>{comment.user_name}</p>
                  <p>Written by {comment.user_name}</p>
                </li>
              ))}
            </div>
            <aside>
              <Button target="_blank" bgColor="true" href={url}>
                External Website
              </Button>

              <div
                css={css`
                  margin-top: 3rem;
                `}
              >
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votes} Votes
                </p>
                <Button>Vote for this product</Button>
              </div>
            </aside>
          </ProductContainer>
        </div>
      </>
    </Layout>
  );
};

export default ProductDetail;
