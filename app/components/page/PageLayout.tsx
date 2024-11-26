import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { User } from "@supabase/supabase-js";

const PageLayout: React.FC<{ children: React.ReactNode,isu:{name:string,slug:string}[] ,user:{name:string,role:boolean},variant?:boolean}> = ({ children,user,variant ,isu}) => {
  return (
    <>
      <Navbar  user={user} isu={isu}  />
      {children}
      <Footer variant={variant} />
    </>
  );
};

export default PageLayout;
