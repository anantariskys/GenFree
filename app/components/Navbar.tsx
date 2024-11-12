import Logo from "~/assets/Logo.png";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { Form, Link } from "@remix-run/react";
import { FC } from "react";
import { User } from "@supabase/supabase-js";

interface NavbarProps {
  user: User;
}
const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="w-full py-4 fixed top-0 bg-white">
      <main className="container flex justify-between items-center ">
        <Link to={"/"}>
          <img src={Logo} className="w-44 " alt="" />
        </Link>
        <div className="flex items-center justify-between gap-4 cursor-pointer">
          <Dropdown title="Isu">
            <p className="py-1">Lingkungan</p>
            <p className="py-1">Kebijakan</p>
            <p className="py-1">Ham</p>
            <p className="py-1">Pembangunan</p>
          </Dropdown>
          <p>Tentang Kami</p>
          {user ? (
            <Dropdown title={user.email}>
              <p className="py-2">profile</p>
              <Form method="post" action="/api/logout">
                <Button width="w-fit">Keluar</Button>
              </Form>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={"/register"}>
                <Button width="w-fit" variant="primary-outline">
                  Daftar
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button width="w-fit">Masuk</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
