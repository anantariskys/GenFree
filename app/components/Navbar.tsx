import { useState } from "react";
import Logo from "~/assets/Logo.png";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { Form, Link } from "@remix-run/react";
import { FC } from "react";
import { User } from "@supabase/supabase-js";
import { Icon } from "@iconify/react";

interface NavbarProps {
  user: {
    name: string;
  }|null;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

  return (
    <nav className="w-full py-2 fixed z-30 top-0 bg-white shadow-md font-semibold">
      <main className="container flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <img src={Logo} className="md:w-44 w-32" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <Dropdown title="Isu">
            <p className="py-1">Lingkungan</p>
            <p className="py-1">Kebijakan</p>
            <p className="py-1">Ham</p>
            <p className="py-1">Pembangunan</p>
          </Dropdown>
          <Link to={'/about'} className="cursor-pointer">Tentang Kami</Link>
          {user?.name ? (
            <Dropdown title={`Hi, ${user.name}`}>
              <p className="py-2">Profile</p>
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

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-2xl focus:outline-none"
          >
            <Icon
              icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
              className="text-3xl"
            />
          </button>
        </div>
      </main>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full">
          <div className="flex flex-col items-center gap-4 py-4">
            <Dropdown title="Isu">
              <p className="py-1">Lingkungan</p>
              <p className="py-1">Kebijakan</p>
              <p className="py-1">Ham</p>
              <p className="py-1">Pembangunan</p>
            </Dropdown>
            <Link to={'/about'} className="cursor-pointer">Tentang Kami</Link>
            {user ? (
              <Dropdown title={user.name}>
                <p className="py-2">Profile</p>
                <Form method="post" action="/api/logout">
                  <Button width="w-fit">Keluar</Button>
                </Form>
              </Dropdown>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Link to={"/register"}>
                  <Button width="w-full" variant="primary-outline">
                    Daftar
                  </Button>
                </Link>
                <Link to={"/login"}>
                  <Button width="w-full">Masuk</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
