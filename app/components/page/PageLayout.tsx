import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;
