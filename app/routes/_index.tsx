import { json, type LoaderFunction } from "@remix-run/node";
import { gsap } from "gsap";
import { useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import PageLayout from "~/components/page/PageLayout";
import { supabase } from "~/utils/supabaseClient";
import HeroImage from "~/assets/heroImage.png";
import { useEffect } from "react";
import Toa from "~/assets/toa.png";
import Lamp from "~/assets/lamp.png";
import Warning from "~/assets/warning.png";
import Arrow from "~/assets/arrow.png";
import IsuCard from "~/components/IsuCard";
import { isuData } from "~/data/dummy";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    return json({ user: null }, { status: 200 });
  }

  const userData = await supabase
    .from("profiles")
    .select()
    .eq("user_id", session.data.session?.user.id)
    .single();
  if (!userData.data) {
    return json({ user: null }, { status: 200 });
  }

  return json({ user: userData.data }, { status: 200 });
};

export default function Index() {
  const user = useLoaderData<{ user: { name: string } }>();

  useEffect(() => {}, []);

  return (
    <PageLayout user={user.user}>
      <section
        id="hero"
        className="h-screen bg-primary text-white relative overflow-hidden"
      >
        <main className="flex hero relative z-20 container -bottom-10 flex-col items-center gap-4 h-full justify-center">
          <img
            id="lamp"
            draggable="false"
            src={Lamp}
            className="absolute w-24 md:w-64 md:left-[10%] left-2 top-[10%] md:top-1/4"
            alt=""
          />
          <img
            id="toa"
            draggable="false"
            src={Toa}
            className="absolute w-24 md:w-64 md:right-[10%] right-2 top-[10%] md:top-1/4"
            alt=""
          />
          <h1 className="text-white bg-[#333132] md:px-7 md:py-4 md:text-6xl px-4 py-4 text-4xl font-semibold rounded-xl">
            GEN-FREE
          </h1>
          <p className="md:text-xl text-sm text-center font-semibold md:font-bold max-w-xl">
            Tempat Terbaik Menyuarakan Pendapatmu Pemuda Beraksi, Demi Demokrasi
            yang Lebih Baik!
          </p>
          <img
            src={HeroImage}
            alt="hero-img"
            draggable="false"
            className="md:w-2/5"
          />
        </main>
        <div className="min-h-[30%] absolute bottom-0 border-2 md:border-4 scale-150 md:scale-110 border-black w-full bg-secondary rounded-t-[100%]"></div>
      </section>
      <section className="bg-secondary space-y-8 py-16">
        <main className="container">
          <div className="bg-white rounded-xl md:px-8 md:py-16 p-4 space-y-4 md:space-y-8">
            <h3 className="text-sm md:text-2xl font-bold text-center">
              Suarakan Pendapat Anda Dengan
            </h3>
            <h1 className="text-2xl md:text-5xl font-bold text-center">
              Diskusi isu-isu Populer 🔥
            </h1>
            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4">
              {isuData.map((item) => (
                <IsuCard description={item.description} title={item.title} />
              ))}
            </div>
          </div>
        </main>
        <main className="container">
          <div className="bg-white rounded-xl relative p-4  md:p-24 space-y-8">
            <img src={Warning} alt="decoration" className="absolute hidden md:block  w-48 top-0 left-0" />
            <img src={Arrow} alt="decoration" className="absolute hidden md:block w-40 bottom-4 right-4" />
            <h1 className="text-2xl md:text-5xl font-bold text-center">
              ⚠️ Peringatan ⚠️ ️
            </h1>
            <p className=" md:text-2xl font-medium text-center">
              Suaramu penting, tapi ingatlah untuk selalu menyuarakannya dengan
              bijak. Berani berpendapat bukan berarti melupakan sikap saling
              menghargai. Jadilah bagian dari perubahan positif dengan
              menyampaikan aspirasi tanpa merendahkan atau menyakiti orang lain.
              Mari bersama ciptakan ruang diskusi yang sehat dan bermakna!
            </p>
            <p className="text-center md:text-base text-sm">
              “Tetap Bijak, Suarakan dengan Santun. Pendapatmu Berarti, Jangan
              Sampai Menyakiti.”
            </p>
          </div>
        </main>
      </section>
    </PageLayout>
  );
}
