import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const InputText = styled.input`
  border: 1px solid var(--gray3);
  padding: 1rem;
  min-width: 300px;
`;
const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 3rem;
  background-image: url("/img/search.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 0.5rem;
  top: 0.5px;
  background-color: white;
  border: none;
  text-indent: -99999px;
  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <InputText type="text" placeholder="Search products"></InputText>
      <InputSubmit type="submit">Search</InputSubmit>
    </form>
  );
};

export default Search;
