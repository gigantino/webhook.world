import NewHookDialog from "@/components/NewHookDialog";
import { Input } from "@/components/ui/input";
import { env } from "@/env.mjs";
import getNextAuthCookie from "@/lib/getNextAuthCookie";
import type { Webhooks } from "@prisma/client";
import { Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function HooksList() {
  const webhooksData = await fetch(`${env.NEXT_BASE_URL}/api/webhooks`, {
    headers: {
      Cookie: getNextAuthCookie(),
    },
  });

  const webhooks: Webhooks[] = await webhooksData.json();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between gap-2">
        <Input placeholder="Search (soon!)" />
        <NewHookDialog />
      </div>
      <div className="flex flex-col gap-2">
        {webhooks.map((w) => (
          <div
            key={w.id}
            className="flex w-full items-center justify-between rounded-lg border px-3 py-2"
          >
            <div className="flex flex-col">
              <Link
                className="font-bold hover:underline"
                href={`/dashboard/${w.id}`}
              >
                {w.name}
              </Link>
              <span className="text-sm font-light text-gray-500">
                {w.created_at.toString()}
              </span>
            </div>
            <div>
              <Button variant={"destructive"}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
