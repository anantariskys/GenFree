
import { createCookieSessionStorage } from "@remix-run/node";


const sessionSecret = process.env.SESSION_SECRET!;
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 10,
    httpOnly: true,
  },
});

export { getSession, commitSession, destroySession };
