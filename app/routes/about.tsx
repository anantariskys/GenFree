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
import { teamData, whyData } from "~/data/dummy";
import WhyCard from "~/components/about/WhyCard";
import TeamCard from "~/components/about/TeamCard";
import { ro } from "date-fns/locale";
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
    user: { name: string,role:boolean };
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
            Gen-Free adalah sebuah platform digital yang mewadahi diskusi dan aspirasi politik berbagai kalangan, terutama Gen-Z, tujuannya adalah untuk meningkatkan partisipasi politik generasi muda yang kritis, praktis, dan taktis. 

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
            description="Kritis, Taktis, Praktis"
          >
          
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
      
          </VisionMissionCard>
        </main>
      </SectionLayout>
      <SectionLayout title="Kenapa Gen-Free?">
        <main className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 gap-4 ">
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
        <main className="grid max-w-7xl mx-auto md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-8 ">
          {teamData.map((item, index) => (
          <TeamCard key={index} item={item} index={index} />
          ))}
        </main>
      </SectionLayout>
    </PageLayout>
  );
};

export default about;
