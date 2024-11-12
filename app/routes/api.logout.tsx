import { ActionFunction, redirect } from "@remix-run/node"
import { supabase } from "~/utils/supabaseClient"

export const action: ActionFunction = async ({ request }) => {
  const logout = await supabase.auth.signOut()

  if (logout.error) {
    return new Response(logout.error.message, { status: 400 })
  } 

  return redirect("/")
  
}