import React from "react";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import Button from "~/components/Button";
import AuthLayout from "~/components/auth/AuthLayout";
import Input from "~/components/Input";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { supabase } from "~/utils/supabaseClient";

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    return redirect("/");
  }
  return null;
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return json({ error: error.message }, { status: 400 });
  }

  const profile = await supabase
    .from("profiles")
    .insert([{ name, user_id: data?.user?.id }]);


  if (profile.error) {
    return json({ error: profile.error.message }, { status: 400 });
  }
  await supabase.auth.signOut()

  return redirect("/login");
};
const Register = () => {
  const actionData = useActionData<{ error?: string }>();

  return (
    <AuthLayout>
      <Form method="post" className="w-full">
        <h1 className="font-bold text-2xl md:text-left text-center md:text-5xl">
          Daftar 👀
        </h1>
        {actionData?.error && (
          <p className="text-red-500 text-center mb-4">{actionData.error}</p>
        )}
        <div className="md:mt-8 space-y-4">
          <Input
            label="Nama"
            id="name"
            placeholder="masukkan nama anda"
            type="text"
            icon="mdi:user"
            name="name"
          />
          <Input
            label="Email"
            id="email"
            placeholder="masukkan email anda"
            type="email"
            icon="ic:round-email"
            name="email"
          />
          <Input
            label="Password"
            id="password"
            placeholder="masukkan password anda"
            type="password"
            icon="lucide:key-round"
            name="password"
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
