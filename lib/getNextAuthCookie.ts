import { env } from "@/env.mjs";
import { cookies } from "next/headers";
export default function getNextAuthCookie() {
  const cookieName = `${env.IS_PRODUCTION === "yes" ? "__Secure-" : ""
    }next-auth.session-token`;
  return `${cookieName}=${cookies().get(cookieName)?.value ?? ""
    }; Path=/; HttpOnly;`;
}
