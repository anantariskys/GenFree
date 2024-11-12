import { Form, Link, useActionData, redirect  } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import Button from "~/components/Button";
import Input from "~/components/Input";
import AuthLayout from "~/components/auth/AuthLayout";
import { supabase } from "~/utils/supabaseClient";
import { sessionStorage } from "~/utils/session";







export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const token = session.get("user_id");
  
  if (token) {
    return redirect("/");
  }
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return json({ error: error.message }, { status: 400 });
  }

  const session = await sessionStorage.getSession();
  session.set("user_id", data.session.user.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};


const Login = () => {
  const actionData = useActionData<{error?: string}>();

  return (
    <AuthLayout>
      <Form method="post" className="w-full">
        <h1 className="font-bold text-2xl md:text-left text-center md:text-5xl">
          Masuk 👀
        </h1>
        <div className="md:mt-8 space-y-4">
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
          {actionData?.error && (
            <p className="text-red-500 text-sm">{actionData.error}</p>
          )}
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

export default Login;
