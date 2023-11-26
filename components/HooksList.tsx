import Hook from "@/components/Hook";
import NewHookDialog from "@/components/NewHookDialog";
import { Input } from "@/components/ui/input";
import { env } from "@/env.mjs";
import getNextAuthCookie from "@/lib/getNextAuthCookie";
import type { Webhooks as Webhook } from "@prisma/client";

export default async function HooksList() {
  const webhooksData = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/webhooks`, {
    headers: {
      Cookie: getNextAuthCookie(),
    },
  });

  const webhooks: Webhook[] = await webhooksData.json();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between gap-2">
        <Input placeholder="Search (soon!)" />
        <NewHookDialog />
      </div>
      <div className="flex flex-col gap-2">
        {webhooks.map((w) => (
          <Hook key={w.id} webhook={w} />
        ))}
      </div>
    </div>
  );
}
