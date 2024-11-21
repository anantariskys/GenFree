import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import AdminLayout from "~/components/page/AdminLayout";
import { sessionStorage } from "~/utils/session";
import { supabase } from "~/utils/supabaseClient";

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user_id");

  if (!userId) {
    redirect("/login");
  }
  const isAdmin = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!isAdmin.data) {
    return redirect("/login");
  }
  if (isAdmin.data.role === false) {
    return redirect("/");
  }

  return json({ user: isAdmin.data }, { status: 200 });
};
export default function Admin() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
