import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import CaseCard from "~/components/CaseCard";
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

  if (!userId) {
    return redirect("/login");
  }

  const cases = await supabase
    .from("cases")
    .select("*,isu(*),votes(*),comment(*,profiles(*),votes(*))")
    .eq("category_id", isu.data.id).eq('is_published',true);


  let casesWithVoteCount = [];
  if (cases.data) {
    casesWithVoteCount = cases.data.map((caseItem) => ({
      ...caseItem,
      total_votes_agree: caseItem.votes.filter(
        (vote: { agree: boolean }) => vote.agree === true
      ).length,
      total_votes_disagree: caseItem.votes.filter(
        (vote: { agree: boolean }) => vote.agree === false
      ).length,
      total_votes: caseItem.votes.length,
      isUserLiked: caseItem.votes.some(
        (vote: { user_id: number }) => vote.user_id === userId
      ),
    }));
  }




  
 

  const userData = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (!userData.data) {
    return json({ user: null }, { status: 200 });
  }
  return json(
    {
      isu: isu.data,
      user: userData.data,
      allIsu: allIsu.data,
      cases: casesWithVoteCount,
    },
    { status: 200 }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const event = formData.get("event") as string;
  if (event === "vote") {
    const case_id = formData.get("case_id") as string;
    const isAgreed = formData.get("isAgreed") as string;
    const user_id = await supabase.auth.getUser();

    if (!user_id.data.user?.id) {
      return redirect("/login");
    }
    const profile = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id.data.user?.id)
      .single();

    

    if (profile.data.display_name ==='' ||profile.data.display_name === null) {
      return json({ error: "Display Name belum diisi, tolong isi di halaman profile" }, { status: 200 });
    }
    const vote = await supabase
      .from("votes")
      .insert({
        case_id,
        user_id: user_id.data.user?.id,
        agree: isAgreed === "1" ? true : false,
      });

    if (vote.error) {
      console.log(vote.error);
      return json({ success: false }, { status: 200 });
    }

    return json({ success: `anda vote ${isAgreed==="1"?'setuju':'tidak setuju'}` }, { status: 200 });
  }

  if (event === "comment") {
    const case_id = formData.get("case_id") as string;
    const comment = formData.get("comment") as string;

    if (!comment) {
      return json({ error: "Comment is required" }, { status: 400 });
    }


    const session = await sessionStorage.getSession(
      request.headers.get("Cookie")
    );
    const userId = session.get("user_id");
    const vote = await supabase.from('votes').select('*').eq('user_id',userId).eq('case_id',case_id).single();

  
    const comments = await supabase.from("comment").insert({case_id,user_id:userId,content  :comment,vote_id:vote.data.id});
    return json({ success: "Opini berhasil ditambahkan" }, { status: 200 });
  }

  return null;
};
const IsuPage = () => {
  const loaderData = useLoaderData<{
    isu: { slug: string; name: string };
    user: {
      name: string;
      display_name: string;
      user_id: number;
      gender: number;
      role:boolean
    };
    allIsu: { name: string; slug: string }[];
    cases: {
      id: number;
      title: string;
      description: string;
      image?: string;
      isu: {
        name: string;
        slug: string;
      };
      votes: {
        user_id: number;
      }[];
      total_votes_agree: number;
      total_votes_disagree: number;
      total_votes: number;
      isUserLiked: boolean;
      comment: {
        id: number;
        content: string;
        user_id: number;
        created_at: string;
        profiles: {
          display_name: string;
          gender: number;
          role:boolean
        };
        votes:{
          agree: boolean
        }
      }[]
    }[];
  }>();


  return (
    <PageLayout isu={loaderData.allIsu} variant user={loaderData.user}>
      <section className="md:h-screen flex py-24 md:flex-row flex-col items-center container  ">
        <main className="md:w-1/2  space-y-4">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold">
            Ruang Diskusi Isu <br />{" "}
            <span className="text-secondary">{loaderData.isu.name}</span>
          </h1>
          <p className="text-base md:text-lg">
            Tempat untuk berbagi pandangan dan berdiskusi tentang isu-isu
            lingkungan terkini
          </p>
          <p className="flex text-primary md:text-base text-sm font-medium items-center gap-1">
            mulai diskusi
            <Icon icon={"ic:round-play-arrow"} />
          </p>
        </main>
        <div className="md:w-1/2 w-full aspect-[8/5] rounded-lg bg-gray-200"></div>
      </section>
      <section className="container py-4 md:py-8 space-y-4 md:space-y-8">
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
      <section className="mx-auto container max-w-7xl py-8 space-y-4">
        <h1 className="text-4xl font-bold">Ruang Diskusi </h1>
        <main className="w-full  mx-auto flex md:flex-row flex-col-reverse items-start gap-8">
          <div className="w-full space-y-4">
            {loaderData.cases.length > 0 ? (
              loaderData.cases.map((caseItem) => (
                <CaseCard user={loaderData.user} props={caseItem} key={caseItem.id} />
              ))
            ) : (
              <small>belum ada studi kasus</small>
            )}
          </div>
          <aside className="p-4 rounded-lg shadow-md border max-w-xs w-full"></aside>
        </main>
      </section>
    </PageLayout>
  );
};

export default IsuPage;
