import Link from "next/link";
import React from "react";
const NavBar = () => {
  return (
    <nav>
      <Link href="/">Index</Link>
      <Link href="/">Popular</Link>
      <Link href="/">New Product</Link>
    </nav>
  );
};

export default NavBar;
