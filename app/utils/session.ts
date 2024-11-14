import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
      name: "sb:token",
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secrets: ["your-secret"],
      maxAge:900
    },
  });