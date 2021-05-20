import Link from "next/link";
import React from "react";
import Search from "../ui/Search";
import NavBar from "./NavBar";
const Header = () => {
  return (
    <header>
      <div>
        <p>P</p>
        <Search />

        <NavBar />
      </div>
      <div>
        <p>Hello: Jon</p>
        <button type="button">Sign Out</button>
        <Link href="/">Login</Link>
        <Link href="/">New Account</Link>
      </div>
    </header>
  );
};

export default Header;
