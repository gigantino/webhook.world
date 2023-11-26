import { getLoggedUser } from "@/lib/github";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const loggedUser = await getLoggedUser();
  if (!loggedUser.id) return loggedUser.error;

  let errored = false;
  const webhooks = await prisma.webhooks
    .findFirst({
      where: { id: params.id },
    })
    .catch((err) => {
      errored = true;
      console.error("Couldn't fetch webhook:", err);
    });

  if (!webhooks) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(webhooks);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const loggedUser = await getLoggedUser();
  if (!loggedUser.id) return loggedUser.error;

  const putWebhookSchema = z.object({
    name: z
      .string()
      .min(3)
      .max(16)
      .refine((value) => /^[a-zA-Z0-9_-]+$/.test(value)),
  });

  const body = await request.json().catch(() => {
    // This method fails if a body isn't returned
  });
  const parsedBody = putWebhookSchema.safeParse(body);
  if (parsedBody.success) {
    const data = parsedBody.data;
    const webhook = await prisma.webhooks
      .update({
        where: {
          id: params.id,
        },
        data,
      })
      .catch((err) => {
        console.log("Couldn't update webhook:", err);
      });

    if (!webhook) {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }

    return Response.json(data);
  }

  return Response.json({ error: parsedBody.error }, { status: 400 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const loggedUser = await getLoggedUser();
  if (!loggedUser.id) return loggedUser.error;

  let errored = false;
  const webhooks = await prisma.webhooks
    .delete({
      where: { id: params.id },
    })
    .catch((err) => {
      errored = true;
      console.error("Couldn't delete webhook:", err);
    });

  if (!webhooks) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(webhooks);
}
