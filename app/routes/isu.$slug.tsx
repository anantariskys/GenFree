import { Icon } from "@iconify/react/dist/iconify.js";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import IsuInformation from "~/components/IsuInformation";
import PageLayout from "~/components/page/PageLayout";
import { sessionStorage } from "~/utils/session";
import { supabase } from "~/utils/supabaseClient";

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug;
  const isu = await supabase.from("isu").select("*").eq("slug", slug).single();

  if (isu.error) {
    return redirect("/");
  }
  const allIsu = await supabase.from("isu").select("*");
  if (allIsu.error) {
    return redirect("/");
  }
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user_id");
  const userProfile = await supabase.auth.getUser();
  if (!userId) {
    return redirect("/login");
  }

  const userData = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (!userData.data) {
    return json({ user: null }, { status: 200 });
  }
  // console.log(isu.data.name);
  return json({ isu: isu.data, user: userData.data ,allIsu:allIsu.data}, { status: 200 });
};
const IsuPage = () => {
  const loaderData = useLoaderData<{
    isu: { slug: string; name: string };
    user: {
      name: string;
      display_name: string;
      user_id: number;
      gender: number;
    };
    allIsu: { name: string; slug: string }[];
  }>();
  return (
    <PageLayout isu={loaderData.allIsu} variant user={loaderData.user}>
      <section className="h-screen flex items-center container  ">
        <main className="w-1/2  space-y-4">
          <h1 className="text-6xl font-bold">
            Ruang Diskusi Isu <br />{" "}
            <span className="text-secondary">{loaderData.isu.name}</span>
          </h1>
          <p className="text-lg">
            Tempat untuk berbagi pandangan dan berdiskusi tentang isu-isu
            lingkungan terkini
          </p>
          <p className="flex text-primary font-medium items-center gap-1">
            mulai diskusi
            <Icon icon={"ic:round-play-arrow"} />
          </p>
        </main>
        <div className="w-1/2 aspect-[8/5] rounded-lg bg-gray-200"></div>
      </section>
      <section className="container py-8 space-y-8">
        <IsuInformation title="Peringatan ⚠">
          {" "}
          Ruang ini berisi studi kasus. Suaramu penting, tapi ingatlah untuk
          selalu menyuarakannya dengan bijak. Berani berpendapat bukan berarti
          melupakan sikap saling menghargai. Jadilah bagian dari perubahan
          positif dengan menyampaikan aspirasi tanpa merendahkan atau menyakiti
          orang lain. Mari bersama ciptakan ruang diskusi yang sehat dan
          bermakna!
        </IsuInformation>
        <IsuInformation title="Detail Isu">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tristique interdum orci et scelerisque. Praesent at vestibulum enim.
          Cras convallis erat eget quam sodales blandit. Sed consequat
          sollicitudin nisi. Curabitur lacinia eget turpis ut ultricies.
          Suspendisse eget nunc a justo vulputate interdum. In hac habitasse
          platea dictumst. Integer non nulla et magna maximus finibus ac vel
          turpis. Maecenas sagittis ligula vitae neque blandit volutpat. Vivamus
          orci arcu, sollicitudin ac semper et, varius eu nisi. Cras
          pellentesque justo nec neque lobortis tincidunt. Nullam sed purus in
          quam eleifend condimentum vitae nec est. Maecenas tincidunt diam nec
          diam fermentum, in fringilla est lobortis. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae;
        </IsuInformation>
      </section>
      <section className="container py-8 space-y-4">
        <h1 className="text-4xl font-bold">Ruang Diskusi </h1>
        <main className="w-full flex items-start gap-8">
          <div className="w-full space-y-4">
            <div className="bg-white relative space-y-4 border-l-4 border-primary  shadow py-8 px-16 rounded-xl">

         
              <h2 className="text-2xl font-bold">Judul studi Kasus</h2>
              <img src="https://random-image-pepebigotes.vercel.app/api/random-image" alt="img" className="w-full h-auto rounded-lg " />
              <p>(Deskripsi Studi Kasus) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique interdum orci et scelerisque. Praesent at vestibulum enim. In hac habitasse platea dictumst. Integer non nulla et magna maximus finibus ac vel turpis. Maecenas sagittis ligula vitae neque blandit volutpat. Vivamus orci arcu, sollicitudin ac semper et, varius eu nisi. Cras pellentesque justo nec neque lobortis tincidunt. Nullam sed purus in quam eleifend condimentum vitae nec est. Maecenas tincidunt diam nec diam fermentum, in fringilla est lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>

            </div>

          </div>
          <aside className="p-4 rounded-lg shadow-md border max-w-sm w-full">

          </aside>

        </main>
      </section>
    </PageLayout>
  );
};

export default IsuPage;