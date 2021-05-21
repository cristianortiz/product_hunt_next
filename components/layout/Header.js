import React, { Fragment } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../ui/Button";
import Search from "../ui/Search";
import NavBar from "./NavBar";

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
  font-size: 3rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Noto Sans JP", sans-serif;
  margin-right: 1.5rem;
`;

const Header = () => {
  const user = false;
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
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
              <Link href="/login">
                <Button bgColor="true">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </Fragment>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
