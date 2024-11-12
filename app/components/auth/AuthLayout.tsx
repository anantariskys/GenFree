import { Link } from "@remix-run/react";
import React, { FC } from "react";

import Logo from '~/assets/Logo.png'
import Img from '~/assets/auth-hero.png'
const AuthLayout:FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <main className="container flex items-center justify-center gap-16 h-screen md:p-10">
      <div className=" md:max-w-lg  w-full relative h-full flex md:flex-row flex-col items-center justify-center  md:p-8">
        <Link to={'/'}>
        <img src={Logo} className="w-44 relative md:absolute md:top-0 left-0 md:left-8" alt="" />
        </Link>
        {children}
      </div>
      <div className="h-full  aspect-square hidden md:flex items-center justify-center  rounded-2xl">
        <img src={Img} className="w-full object-contain h-full" alt="img" draggable='false' />
      </div>
    </main>
  );
};

export default AuthLayout;
