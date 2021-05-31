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
  const [comment, setComment] = useState({});

  //next routing to get the actual product id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //firebase context
  const { firebase, user } = useContext(FirebaseContext);
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
  }, [id, product]);
  //meanwhile the product info is loaded from firestore, could use a spinner too
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
    voted_by,
  } = product;

  //manage and validates users votes to a product
  const voteProduct = () => {
    if (!user) {
      return router.push("/login");
    }
    //get and add a new vote
    const acc = votes + 1;
    //check if the actual user is already vote for this product
    if (voted_by.includes(user.uid)) return;
    //save uid of user who has voted for this product
    const has_voted = [...voted_by, user.uid];
    //update votes in firestore DB
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: acc, voted_by: has_voted });
    //update votes in state
    setProduct({
      ...product,
      votes: acc,
    });
  };

  //functions to create comments
  const commentChange = (e) => {
    //add comment to local state comments
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };
  //add comments submit form event
  const addComment = (e) => {
    e.preventDefault();
    //check if a user is logged
    if (!user) {
      return router.push("/login");
    }
    //as comment state is an object[], we can add it more properties
    comment.uid = user.uid; //who has wrote this comments
    comment.displayName = user.displayName; //
    //copy the comments prop of product object and add the new comments to it
    const newComments = [...comments, comment];
    //update firestore BD
    firebase.db.collection("products").doc(id).update({
      comments: newComments,
    });
    //update local state of product whit the new one
    setProduct({
      ...product,
      comments: newComments,
    });
  };
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
              {user && (
                <>
                  <h2>Add a comment</h2>
                  <form onSubmit={addComment}>
                    <Field>
                      <input
                        type="text"
                        name="msg"
                        onChange={commentChange}
                      ></input>
                    </Field>
                    <InputSubmit
                      type="submit"
                      value="Add comment"
                    ></InputSubmit>
                  </form>
                </>
              )}
              <h2
                css={css`
                  margin-top: 2rem;
                `}
              >
                Comments
              </h2>
              {comments.length === 0 ? (
                "There is no comments yet"
              ) : (
                <ul>
                  {comments.map((comment, i) => (
                    <li
                      key={`${comment.uid}-${i}`}
                      css={css`
                        border: 1px solid #e1e1e1;
                        padding: 1rem;
                        margin-bottom: 1rem;
                      `}
                    >
                      <p>{comment.msg}</p>
                      <p>
                        Written by{" "}
                        <span
                          css={css`
                            font-weight: bold;
                          `}
                        >
                          {" "}
                          {comment.displayName}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
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

                {user && (
                  <Button onClick={voteProduct}>Vote for this product</Button>
                )}
              </div>
            </aside>
          </ProductContainer>
        </div>
      </>
    </Layout>
  );
};

export default ProductDetail;
