import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string; secret: string } },
) {
  const webhookSchema = z.object({
    content: z.string().max(4000),
  });

  const body = await request.json().catch(() => {
    // This method fails if a body isn't returned
  });

  const parsedBody = webhookSchema.safeParse(body);
  if (parsedBody.success) {
    const webhook = await prisma.webhooks
      .findFirst({
        where: {
          id: params.id,
          secret: params.secret,
        },
      })
      .catch((err) => {
        console.log("Couldn't find webhook:", err);
      });

    if (!webhook) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const createdMessage = await prisma.messages
      .create({
        data: {
          content: parsedBody.data.content,

          webhook: params.id,
        },
      })
      .catch((err) => {
        console.log("Couldn't create message:", err);
      });

    if (!createdMessage) {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }

    return Response.json(parsedBody.data.content);
  }

  return Response.json({ error: parsedBody.error }, { status: 400 });
}
