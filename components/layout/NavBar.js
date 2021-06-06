import Link from "next/link";
import React, { useContext } from "react";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";

const Nav = styled.nav`
  padding-left: 1.5rem;
  a {
    font-size: 1rem;
    margin-left: 1.5rem;
    color: var(--gray2);
    font-family: "Noto Sans JP", sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const NavBar = () => {
  const { user } = useContext(FirebaseContext);
  return (
    <Nav>
      <Link href="/">
        <a>Index</a>
      </Link>
      <Link href="/popular">
        <a>Popular</a>
      </Link>
      {user && (
        <Link href="/new-product">
          <a>New Product</a>
        </Link>
      )}
    </Nav>
  );
};

export default NavBar;
