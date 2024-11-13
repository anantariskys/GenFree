import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import PageLayout from "~/components/page/PageLayout";
import { sessionStorage } from "~/utils/session";
import { supabase } from "~/utils/supabaseClient";

import HeroImg from "~/assets/about-hero.png";
export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user_id");

  console.log(userId);

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

const about = () => {
  const user = useLoaderData<{ user: { name: string } }>();

  return (
    <PageLayout variant user={user.user}>
      <section className="h-screen relative flex justify-center items-center">
        <main className="container flex items-center">
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-primary font-semibold text-3xl">
              Tentang Gen-Free
            </h3>
            <h1 className="text-5xl font-semibold">Apa Itu Gen-Free?</h1>
            <p>
              GEN-FREE adalah sebuah platform demokrasi yang memberikan ruang
              bagi pemuda untuk berpartisipasi aktif dalam menyuarakan pendapat
              dan memperjuangkan perubahan. Melalui berbagai isu seperti
              lingkungan, kebijakan, hak asasi manusia, dan pembangunan,
              GEN-FREE menyediakan ruang debat interaktif dan fitur kampanye
              yang mendorong diskusi sehat serta pemahaman bersama.
            </p>
          </div>
          <div className="md:w-1/2 p-10">
            <img src={HeroImg} alt="hero-img" className="w-full" />
          </div>
        </main>
      </section>
      <section className="container py-10 justify-evenly flex items-center">
        <div className="max-w-lg w-full p-4 space-y-2">
          <h3 className="text-3xl font-semibold text-secondary">
            Visi Gen-Free
          </h3>
          <h1 className="text-5xl font-semibold">Lorem Ipsum</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut
            laoreet nisl. Morbi neque augue, sagittis ac arcu ac, tristique
            sodales risus. Etiam maximus est non dui tristique ornare.
          </p>
        </div>
        <div className="max-w-lg w-full p-4 space-y-2">
          <h3 className="text-3xl font-semibold text-secondary">
            Misi Gen-Free
          </h3>
          <h1 className="text-5xl font-semibold">Lorem Ipsum</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut
            laoreet nisl. Morbi neque augue, sagittis ac arcu ac, tristique
            sodales risus. Etiam maximus est non dui tristique ornare.
          </p>
        </div>
      </section>
      <section className="container  py-4 space-y-4">
        <h1 className="text-3xl font-semibold text-center text-primary">Kenapa Gen-Free?</h1>

        <div className="flex justify-center gap-16">
          <div className="w-full max-w-lg rounded-xl p-2 border flex gap-4 items-center">
            <div className="min-w-24 aspect-square bg-gray-500 rounded-lg">

            </div>
            <div className="">
                <h1 className="font-semibold text-3xl">Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut laoreet nisl. </p>
            </div>
          </div>
          <div className="w-full max-w-lg rounded-xl p-2 border flex gap-4 items-center">
            <div className="min-w-24 aspect-square bg-gray-500 rounded-lg">

            </div>
            <div className="">
                <h1 className="font-semibold text-3xl">Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut laoreet nisl. </p>
            </div>
          </div>
      
        </div>
        <div className="flex justify-center gap-16">
        <div className="w-full max-w-lg rounded-xl p-2 border flex gap-4 items-center">
            <div className="min-w-24 aspect-square bg-gray-500 rounded-lg">

            </div>
            <div className="">
                <h1 className="font-semibold text-3xl">Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut laoreet nisl. </p>
            </div>
          </div>
          <div className="w-full max-w-lg rounded-xl p-2 border flex gap-4 items-center">
            <div className="min-w-24 aspect-square bg-gray-500 rounded-lg">

            </div>
            <div className="">
                <h1 className="font-semibold text-3xl">Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut laoreet nisl. </p>
            </div>
          </div>
        </div>
        <div>

        </div>
      </section>
    </PageLayout>
  );
};

export default about;
