import React from "react";
import { Form, Link } from "@remix-run/react";
import Button from "~/components/Button";
import AuthLayout from "~/components/auth/AuthLayout";
import Input from "~/components/Input";

const Register = () => {
  return (
    <AuthLayout>
      <Form method="GET" className="w-full">
        <h1 className="font-bold text-2xl md:text-left text-center md:text-5xl">
          Daftar 👀
        </h1>
        <div className="md:mt-8 space-y-4">
          <Input
            label="Nama"
            id="name"
            placeholder="masukkan nama anda"
            type="text"
            icon="mdi:user"
          />
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
            Daftar
          </Button>
          <p className="text-center md:text-base text-sm">
            udah punya akun?{" "}
            <Link to={"/login"} className="font-bold">
              masuk aja
            </Link>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Register;
