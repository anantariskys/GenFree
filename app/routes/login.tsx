import { Form, Link } from "@remix-run/react";
import React from "react";
import Logo from "../assets/Logo.png";
import { Icon } from "@iconify/react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import AuthLayout from "~/components/auth/AuthLayout";
const login = () => {
  return (
    <AuthLayout>
      <Form className="w-full ">
        <h1 className="font-bold text-2xl md:text-left text-center md:text-5xl">Masuk 👀</h1>
        <div className="md:mt-8 space-y-4">
          <Input
            label="Email"
            id="email"
            placeholder="masukkan email anda"
            type="email"
            icon="ic:round-email"
          />
          <Input
            label="Password"
            id="password"
            placeholder="masukkan password anda"
            type="password"
            icon="lucide:key-round"
          />
          <div className="flex justify-end">
            <small className="text-right">lupa password</small>
          </div>
          <Button type="submit" width="w-full">
            Masuk
          </Button>
          <p className="text-center md:text-base text-sm">
            belum punya akun?{" "}
            <Link to={"/register"} className="font-bold">
              daftar sini
            </Link>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default login;
