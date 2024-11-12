import { json, redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import PageLayout from "~/components/page/PageLayout";
import { supabase } from "~/utils/supabaseClient";
import HeroImage from '~/assets/heroImage.png'

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
    <section className=" h-screen bg-primary text-white relative overflow-hidden">
      <main className="flex relative z-20 container -bottom-10 flex-col items-center gap-4 h-full   justify-center">
      <h1 className="text-white bg-[#333132] px-7 py-4 text-6xl font-semibold rounded-xl">GEN-FREE</h1>
      <p className="text-xl text-center font-bold max-w-xl">Tempat Terbaik Menyuarakan Pendapatmu
      Pemuda Beraksi, Demi Demokrasi yang Lebih Baik!</p>
      <img src={HeroImage} alt="hero-img" draggable='false' className="w-2/5" />
      </main>
      <div className="min-h-40 absolute bottom-0 border-4 scale-110 border-black w-full bg-secondary  rounded-t-[100%]">

      </div>
    </section>
    </PageLayout>
  );
}

