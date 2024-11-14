import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PageLayout from "~/components/page/PageLayout";
import { sessionStorage } from "~/utils/session";
import { supabase } from "~/utils/supabaseClient";

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user_id");

  if (!userId) {
    return json({ user: null }, { status: 200 });
  }

  const userData = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userId)
    .single();
  if (!userData.data) {
    return json({ user: null }, { status: 200 });
  }

  return json({ user: userData.data }, { status: 200 });
};
const profile = () => {
  const user = useLoaderData<{ user: { name: string } }>();
  return <PageLayout user={user.user} variant>
    <section className="h-screen">

    </section>
  </PageLayout>;
};

export default profile;
