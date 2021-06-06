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
const ProductCreator = styled.p`
  padding: 0.3rem 1rem;
  background-color: #da552f;
  color: #fff;
  font-weight: bold;
  display: inline-block;
  margin-left: 1rem;
  text-align: center;
`;
const ProductDetail = () => {
  //local state to handle product data from FireStore DB
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});
  const [requestDB, setRequestDB] = useState(true); //useEffect dependency

  //next routing to get the actual product id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //firebase context
  const { firebase, user } = useContext(FirebaseContext);
  useEffect(() => {
    if (id && requestDB) {
      const getProductDB = async () => {
        const product_query = await firebase.db.collection("products").doc(id);
        const product_db = await product_query.get();
        if (product_db.exists) {
          //update local state whit the product info from firestore
          setProduct(product_db.data());
          setRequestDB(false);
        } else {
          setError(true);
          setRequestDB(false);
        }
      };
      getProductDB();
    }
  }, [id]);
  //meanwhile the product info is loaded from firestore, could use a spinner too
  if (Object.keys(product).length === 0 && !error) return "Loading...";
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

  //-------manage and validates users votes---------
  const voteProduct = () => {
    if (!user) {
      return router.push("/login");
    }

    /* check if the actual user is already vote for this product
    TODO: sent an alert in modal window */
    if (voted_by.includes(user.uid)) return;
    //get and add a new vote
    const acc = votes + 1;
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
    //activateuseEffect hook and reload the product data from BD with the new vote
    setRequestDB(true);
  }; //-----------------

  //-------functions to create comments-------
  const commentChange = (e) => {
    //add comment to local state comments
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };
  //checks if the author of a comment is also the owner of the product
  const isCreator = (id) => {
    if (created_by.id === id) return true;
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
    //update firestore BD whit the new comment
    firebase.db.collection("products").doc(id).update({
      comments: newComments,
    });
    //update local state of product whit the new comment
    setProduct({
      ...product,
      comments: newComments,
    });
    //activateuseEffect hook and reload the product data from BD with the new comment
    setRequestDB(true);
  }; //---------

  //check if the user logged us the same who creates a product
  const canDelete = () => {
    if (!user) return false;
    if (created_by.id === user.uid) {
      return true;
    }
  };

  const deleteProduct = async () => {
    if (!user) return router.push("/login");
    if (created_by.id !== user.uid) return router.push("/");

    try {
      await firebase.db.collection("products").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
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
                        </p>{" "}
                        {isCreator(comment.uid) && (
                          <ProductCreator>Is Creator</ProductCreator>
                        )}
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
            {canDelete() && (
              <Button onClick={deleteProduct}>Delete Product</Button>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default ProductDetail;
