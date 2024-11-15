
import { redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server"; 

export async function requireUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (!user) {
    throw redirect("/login"); 
  }
  return user;
}

export async function checkIfLoggedIn(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return session.has("user");
}
