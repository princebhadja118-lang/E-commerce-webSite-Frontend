import React from "react";
import shopkartLogo from "../assets/shopkart-logo.svg";

const Logo = ({ width = 180, className = "" }) => {
  const height = (width / 320) * 100;
  return (
    <img
      src={shopkartLogo}
      alt="ShopKart"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Logo;
