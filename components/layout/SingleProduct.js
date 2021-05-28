import React from "react";
import styled from "@emotion/styled";
import { formatDistanceToNow } from "date-fns";
const Product = styled.li`
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;
const ProductDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Title = styled.a`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const TextDescription = styled.div`
  font-size: 1rem;
  margin: 0;
  color: #888;
`;

const Comments = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.1rem 0.5rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
  img {
    width: 2rem;
    margin-right: 1rem;
  }
  p {
    font-size: 1rem;
    margin-right: 1rem;
  }
`;
const Image = styled.img`
  width: 200px;
`;
const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 2rem;
  div {
    font-size: 1.2rem;
  }
  p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const SingleProduct = ({ product }) => {
  const {
    id,
    brand,
    comments,
    created_at,
    product_name,
    description,
    url,
    url_image,
    votes,
  } = product;
  return (
    <Product>
      <ProductDescription>
        <div>
          <Image src={url_image} />
        </div>
        <div>
          <Title>{product_name}</Title>
          <TextDescription>{description}</TextDescription>
          <Comments>
            <div>
              <img src="/img/comment.png" />
              <p>{comments.length} comments</p>
            </div>
          </Comments>
          <p>Posted {formatDistanceToNow(new Date(created_at))} ago</p>
        </div>
      </ProductDescription>
      <Votes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </Votes>
    </Product>
  );
};

export default SingleProduct;
