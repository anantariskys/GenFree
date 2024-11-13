import React from "react";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import Button from "~/components/Button";
import AuthLayout from "~/components/auth/AuthLayout";
import Input from "~/components/Input";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { supabase } from "~/utils/supabaseClient";
import { sessionStorage } from "~/utils/session";

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const token = session.get("user_id");

  if (token) {
    return redirect("/");
  }
  return null;
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const gender = formData.get("gender") as string;

  console.log(gender)

  if (!name || !email || !password || !gender) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return json({ error: error.message }, { status: 400 });
  }

  const genderId = gender === "female" ? 0 : 1;

  const profile = await supabase
    .from("profiles")
    .insert([{ name, user_id: data?.user?.id, gender: genderId }]);

  if (profile.error) {
    return json({ error: profile.error.message }, { status: 400 });
  }
  await supabase.auth.signOut();

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
          <div className="flex items-center gap-4 space-y-2">
            <label htmlFor="gender" className="md:text-xl text-base">
              Gender
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-radio text-pink-600"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
          </div>

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
