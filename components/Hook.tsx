"use client";
import { env } from "@/env.mjs";
import type { Webhooks as Webhook } from "@prisma/client";
import { Check, Link as LinkIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";
import { Button } from "./ui/button";

interface HookProps {
  webhook: Webhook;
}

export default function Hook({ webhook }: HookProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [_state, copyToClipboard] = useCopyToClipboard();
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (linkCopied) {
      setTimeout(() => {
        setLinkCopied(false);
      }, 1000);
    }
  }, [linkCopied]);

  async function deleteHook() {
    setIsDeleted(true);
    const deleteRequest = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/webhooks/${webhook.id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    if (!deleteRequest.ok) setIsDeleted(false);
  }

  return (
    !isDeleted && (
      <div className="flex w-full items-center justify-between rounded-lg border px-3 py-2">
        <div className="flex flex-col">
          <Link
            className="font-bold hover:underline"
            href={`/dashboard/${webhook.id}`}
          >
            {webhook.name}
          </Link>
          <span className="text-sm font-light text-gray-500">
            {webhook.created_at.toString()}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              copyToClipboard(
                `${env.NEXT_PUBLIC_BASE_URL}/webhook/${webhook.id}/${webhook.secret}`,
              );
              setLinkCopied(true);
            }}
          >
            {linkCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
          </Button>
          <Button variant={"destructive"} onClick={() => deleteHook()}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    )
  );
}
