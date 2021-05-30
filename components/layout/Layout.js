import React, { Fragment } from "react";
import Header from "./Header";
import { Global, css } from "@emotion/react";
import Head from "next/head";
const Layout = (props) => {
  return (
    <Fragment>
      <Global
        styles={css`
          //Global styles for the app
          :root {
            --gray: #3d3d3d;
            --gray2: #6f6f6f;
            --gray3: #e1e1e1;
            --orange: #da552f;
          }
          html {
            font-size: 62, 5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1rem; //equals to 16px
            line-height: 1.5;
            font-family: "Roboto", serif;
          }
          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }
          h1,
          h2 {
            font-family: "Roboto", serif;
            font-weight: 700;
          }
          h3 {
            font-family: "Noto Sans JP", sans-serif;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          a {
            text-decoration: none;
          }
          img {
            max-width: 100%;
          }
        `}
      />
      <Head>
        <html lang="en" />
        <title>Product Hunt Firebase and Next.js</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link href="/css/app.css" rel="stylesheet" />
      </Head>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
