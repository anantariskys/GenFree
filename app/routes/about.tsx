import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import PageLayout from "~/components/page/PageLayout";
import { sessionStorage } from "~/utils/session";
import { supabase } from "~/utils/supabaseClient";

import HeroImg from "~/assets/about-hero.png";
import VisionMissionCard from "~/components/VisionMissionCard";
import SectionLayout from "~/components/about/SectionLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { whyData } from "~/data/dummy";
import WhyCard from "~/components/about/WhyCard";
export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user_id");

  const allIsu = await supabase.from("isu").select("*");
  if (allIsu.error) {
    return redirect("/");
  }

  if (!userId) {
    return json({ user: null, allIsu: allIsu.data }, { status: 200 });
  }

  const userData = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userId)
    .single();
  if (!userData.data) {
    return json({ user: null }, { status: 200 });
  }

  return json({ user: userData.data, allIsu: allIsu.data }, { status: 200 });
};

const about = () => {
  const user = useLoaderData<{
    user: { name: string };
    allIsu: { name: string; slug: string }[];
  }>();

  return (
    <PageLayout isu={user.allIsu} variant user={user.user}>
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

      <SectionLayout title="Visi dan Misi Gen-Free">
        <main className="justify-evenly flex items-start">
          <VisionMissionCard
            title="Visi Gen-Free"
            description="Ekosistem Demokrasi"
          >
            <p>
              Menciptakan ekosistem demokrasi yang inklusif, dinamis, serta
              mendorong pemuda agar berperan aktif dalam perubahan sosial,
              politik, dan kebijakan untuk membangun masa depan yang berkeadilan
              dan berkelanjutan.
            </p>
          </VisionMissionCard>

          <VisionMissionCard
            title="Misi Gen-Free"
            description="Partisipasi Aktif"
          >
            <ol className="list-decimal ">
              <li>Mendorong Partisipasi Aktif Pemuda sebagai Agen Perubahan</li>
              <li>Mengadvokasi Isu-isu yang Berdampak pada Generasi Muda</li>
              <li>
                Memanfaatkan Teknologi sebagai Ruang Aman yang Bersifat
                Anonimitas.
              </li>
            </ol>
            <p className="font-bold">
              (democratic innovation: digital participation)
            </p>
          </VisionMissionCard>
        </main>
      </SectionLayout>
      <SectionLayout title="Kenapa Gen-Free?">
        <main className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 gap-4 ">
          {whyData.map((item, index) => (
            <WhyCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </main>
      </SectionLayout>
      <SectionLayout title="Di Balik GEN-FREE">
        <main className="grid max-w-6xl mx-auto md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-8 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full   rounded-lg ">
              <img
                src="https://xsgames.co/randomusers/avatar.php?g=male"
                className="w-full aspect-square rounded-3xl bg-gray-100 object-cover"
                alt={`image ${index}`}
                draggable='false'
              />
              <h5 className="text-2xl font-semibold">Lorem Ipsum</h5>
              <p className=" ">Lorem, ipsum.</p>
            </div>
          ))}
        </main>
      </SectionLayout>
    </PageLayout>
  );
};

export default about;
