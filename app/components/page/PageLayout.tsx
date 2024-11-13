import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { User } from "@supabase/supabase-js";

const PageLayout: React.FC<{ children: React.ReactNode ,user:{name:string},variant?:boolean}> = ({ children,user,variant }) => {
  return (
    <>
      <Navbar user={user}  />
      {children}
      <Footer variant={variant} />
    </>
  );
};

export default PageLayout;
