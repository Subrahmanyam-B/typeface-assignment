import React from "react";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="py-14 w-full">
      <div className="">
        <img src={Logo} className="mx-auto" />
      </div>
    </div>
  );
};

export default Navbar;
