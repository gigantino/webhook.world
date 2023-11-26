"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "@/env.mjs";
import type { Webhooks as Webhook } from "@prisma/client";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export default function NewHookDialog() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function createNewHook() {
    if (isLoading) return;
    setIsLoading(true);
    const nameSchema = z
      .string()
      .min(3, { message: "The name has to be at least 3 characters long." })
      .max(16, { message: "The name has to be at max 16 characters long." })
      .refine((value) => /^[a-zA-Z0-9_-]+$/.test(value), {
        message:
          "The only characters allowed are numbers, letters and underscores",
      });

    const parsedName = nameSchema.safeParse(name);
    if (parsedName.success) {
      const newHookReq = await fetch(
        `${env.NEXT_PUBLIC_BASE_URL}/api/webhooks`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
          }),
          credentials: "include",
        },
      );
      if (!newHookReq.ok) {
        setIsLoading(false);
        // TODO: Handle the errors properly
        setError("Internal server error!");
      }
      const data: Webhook = await newHookReq.json();
      setIsLoading(false);
      return router.push(`/dashboard/${data.id}`);
    }

    setIsLoading(false);
    setError(JSON.parse(parsedName.error.message)[0].message);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New webhook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New webhook</DialogTitle>
          <DialogDescription>Webhook setup wizard</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4 py-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" className="font-bold">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(v) => setName(v.target.value)}
            />
            {error && <div className="text-xs text-red-400">{error}</div>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={createNewHook} className="relative">
            <Loader2
              className={`absolute mr-2 h-4 w-4 animate-spin ${isLoading ? "text-white" : "text-transparent"
                }`}
            />
            <span className={isLoading ? "text-transparent" : "text-white"}>
              Crate webhook
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
