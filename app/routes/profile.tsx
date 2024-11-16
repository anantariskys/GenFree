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
import AvatarBoy from "~/assets/avatar_boy.png";
import AvatarGirl from "~/assets/avatar_girl.png";
import Input from "~/components/Input";
import Button from "~/components/Button";
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

  console.log(user_id);

  const { data, error } = await supabase
    .from("profiles")
    .update({ name: nama, display_name: display_name })
    .eq("user_id", user_id.data.user?.id);

  console.log(data, error);
  return null;
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
          <div className="flex items-center gap-4">
            <img
              src={user.user.gender === 1 ? AvatarBoy : AvatarGirl}
              className="border-2 rounded-full w-28"
              alt="avatar-img"
              draggable="false"
            />
            <div>
              <h3 className="text-3xl font-medium">{user.user.name}</h3>
              <p>{user.userProfile.user.email}</p>
            </div>
          </div>
          <Form method="post" className="grid grid-cols-2 gap-4 ">
            <Input
              id="nama"
              label="Nama"
              placeholder="Alif Nur Sanubari"
              value={user.user.name}
              name="nama"
            />
            <Input
              id="display_name"
              label="Nama Tampilan"
              placeholder="Mohon isi nama tampilan"
              value={user.user.display_name}
              name="display_name"
            />
            <Input
              disabled
              id="email"
              label="Email"
              value={user.userProfile.user.email}
              placeholder="Mohon isi email"
              name="email"
            />
            <div className="flex items-end">
              <Button width="w-fit">Simpan</Button>
            </div>
          </Form>
        </main>
      </section>
    </PageLayout>
  );
};

export default profile;
