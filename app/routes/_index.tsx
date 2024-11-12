import { json, redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import PageLayout from "~/components/page/PageLayout";
import { supabase } from "~/utils/supabaseClient";


export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await supabase.auth.getSession()

  if (!session.data.session) {
    return json(null)
  }

  return json(session.data.session.user)


  
}

export default function Index() {
  const user = useLoaderData<User>();

  return (
    <PageLayout user={user}>
    <section className=" h-screen bg-primary">
      <main className="flex container items-center h-full   justify-center">
      <h1 className="text-white bg-[#333132] p-10 text-8xl font-semibold rounded-xl">GEN-FREE</h1>
      </main>
    </section>
    </PageLayout>
  );
}

