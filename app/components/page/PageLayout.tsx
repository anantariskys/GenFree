import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { User } from "@supabase/supabase-js";

const PageLayout: React.FC<{ children: React.ReactNode ,user:{name:string}}> = ({ children,user }) => {
  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;
