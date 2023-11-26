import { env } from "@/env.mjs";
import { cookies } from "next/headers";
export default function getNextAuthCookie() {
  return `${
    env.IS_PRODUCTION == "yes" ? "__Secure" : ""
  }next-auth.session-token=${
    cookies().get("next-auth.session-token")?.value ?? ""
  }; Path=/; HttpOnly;`;
}
