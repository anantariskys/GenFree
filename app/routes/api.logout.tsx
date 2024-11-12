import { ActionFunction, redirect } from "@remix-run/node"
import { sessionStorage } from "~/utils/session";
import { supabase } from "~/utils/supabaseClient"

export const action: ActionFunction = async ({ request }) => {
  const logout = await supabase.auth.signOut()

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
  
}