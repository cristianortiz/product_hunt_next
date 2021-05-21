import Link from "next/link";
import React, { Fragment } from "react";
import Search from "../ui/Search";
import NavBar from "./NavBar";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../ui/Button";

//-------Styled components---------
const HeaderContainer = styled.div`
  //<header>
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Noto Sans JP", sans-serif;
  margin-right: 2rem;
`;

const Header = () => {
  const user = false;
  return (
    <HeaderContainer
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <div>
        <Link href="/">
          <Logo>P</Logo>
        </Link>
        <Search />

        <NavBar />
      </div>

      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {user ? (
          <Fragment>
            <p
              css={css`
                margin-right: 2rem;
              `}
            >
              Hello: Jon
            </p>
            <Button bgColor="true">Sign Out</Button>
          </Fragment>
        ) : (
          <Fragment>
            <Link href="/">
              <Button bgColor="true">Login</Button>
            </Link>
            <Link href="/">
              <Button>New Account</Button>
            </Link>
          </Fragment>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
