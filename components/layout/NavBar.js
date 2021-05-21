import Link from "next/link";
import React from "react";
import styled from "@emotion/styled";

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
  return (
    <Nav>
      <Link href="/">Index</Link>
      <Link href="/popular">Popular</Link>
      <Link href="/new-product">New Product</Link>
    </Nav>
  );
};

export default NavBar;
