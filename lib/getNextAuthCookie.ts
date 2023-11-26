import { cookies } from "next/headers";
export default function getNextAuthCookie() {
  return `next-auth.session-token=${
    cookies().get("next-auth.session-token")?.value ?? ""
  }; Path=/; HttpOnly;`;
}
