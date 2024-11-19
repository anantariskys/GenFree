import {
  ActionFunction,
  data,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import PageLayout from "~/components/page/PageLayout";
import { sessionStorage } from "~/utils/session";
import { supabase } from "~/utils/supabaseClient";
import ProfileImg from "~/assets/profileHeading.png";
import ProfileSection from "~/components/profile/ProfileSection";
import FormProfile from "~/components/profile/FormProfile";
export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user_id");
  const userProfile = await supabase.auth.getUser();
  if (!userId) {
    return redirect("/login");
  }

  const allIsu = await supabase.from("isu").select("*");
  if (allIsu.error) {
    return redirect("/");
  }

  const userData = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (!userData.data) {
    return json({ user: null }, { status: 200 });
  }
  //   console.log(userProfile.data.user?.email,)

  return json(
    { user: userData.data, userProfile: userProfile.data, allIsu: allIsu.data },
    { status: 200 }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const nama = formData.get("nama") as string;
  const display_name = formData.get("display_name") as string;
  const user_id = await supabase.auth.getUser();

  if (!user_id.data.user?.id) {
    return redirect("/login");
  }

  if (!nama) {
    return json({ error: "Nama tidak boleh kosong" }, { status: 400 });
  }

  if (!display_name) {
    return json({ error: "Nama tampilan tidak boleh kosong" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ name: nama, display_name: display_name })
    .eq("user_id", user_id.data.user?.id);
  if (error) {
    return json({ error: error.message }, { status: 400 });
  }

  return json({ success: "Profile updated successfully" }, { status: 200 });
};
const profile = () => {
  const user = useLoaderData<{
    user: {
      name: string;
      display_name: string;
      user_id: number;
      gender: number;
    };
    allIsu: { name: string; slug: string }[];
    userProfile: { user: { email: string } };
  }>();
  return (
    <PageLayout isu={user.allIsu} user={user.user} variant>
      <section className="pt-36 container flex items-center  justify-center">
        <img
          src={ProfileImg}
          alt="heading-img"
          className="w-2/5"
          draggable="false"
        />
      </section>
      <section className="container py-8">
        <main className="border-2 max-w-5xl mx-auto rounded-2xl py-4 px-16 space-y-4">
          <ProfileSection user={user} />
          <FormProfile user={user} />
        </main>
      </section>
    </PageLayout>
  );
};

export default profile;
