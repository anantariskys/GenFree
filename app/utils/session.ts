import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
      name: "sb:token",
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: ["your-secret"],
      expires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });