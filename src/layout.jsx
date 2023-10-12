// import React from "react";
import Header from "./components/header";

const Layout = ({ children }) => {
  console.log("layout");
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
