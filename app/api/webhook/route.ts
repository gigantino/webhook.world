import extractGitHubUserId from "@/lib/extractGitHubUserId";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import crypto from "node:crypto";
import { z } from "zod";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session || !session.user || typeof session.user.image !== "string") {
    return Response.json(
      {
        error: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const userId = extractGitHubUserId(session.user.image);
  if (!userId) {
    return Response.json(
      {
        error: "Couldnt't extract GitHub userId",
      },
      { status: 500 },
    );
  }

  const webhooks = await prisma.webhooks
    .findMany({
      where: {
        author: userId,
      },
    })
    .catch((err) => {
      console.error("Couldn't fetch webhooks:", err);
    });

  if (!webhooks) {
    return Response.json(
      {
        error: "Couldnt't fetch webhooks",
      },
      { status: 500 },
    );
  }

  return Response.json(webhooks);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session || !session.user || typeof session.user.image !== "string") {
    return Response.json(
      {
        error: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const userId = extractGitHubUserId(session.user.image);
  if (!userId) {
    return Response.json(
      {
        error: "Couldnt't extract GitHub userId",
      },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => {
    // This method fails if a body isn't returned
  });

  const postWebhookSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." })
      .max(16, { message: "Name must be at most 16 characters long." })
      .refine((value) => /^[a-zA-Z0-9_-]+$/.test(value), {
        message:
          "Invalid name format. It can only contain letters, numbers, underscores, and hyphens.",
      }),
  });

  const parsedBody = postWebhookSchema.safeParse(body);
  if (parsedBody.success) {
    const data = parsedBody.data;
    const id = crypto.randomBytes(16).toString("hex");
    const secret = crypto.randomBytes(32).toString("hex");
    const webhook = await prisma.webhooks
      .create({
        data: {
          id,
          name: data.name,
          secret,
          author: userId,
        },
      })
      .catch((err) => {
        console.log("Couldn't create webhook:", err);
      });

    if (!webhook) {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }

    return Response.json(webhook);
  }

  return Response.json({ error: parsedBody.error }, { status: 400 });
}
