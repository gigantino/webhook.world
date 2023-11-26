import LogsList from "@/components/LogsList";
import { env } from "@/env.mjs";
import getNextAuthCookie from "@/lib/getNextAuthCookie";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  let notFound = false;

  const webhookData = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/webhooks/${params.id}`,
    {
      headers: {
        Cookie: getNextAuthCookie(),
      },
    },
  );

  if (!webhookData.ok) {
    if (webhookData.status === 404) notFound = true;
    else redirect("/dashboard");
  }

  return notFound ? (
    <div className="flex w-full flex-col items-center justify-center">
      <span className="text-xl font-bold">Not found !!1!11</span>
      <Link href="/dashboard" className="underline">
        Go to the dashboard
      </Link>
    </div>
  ) : (
    <LogsList webhookId={params.id} />
  );
}
