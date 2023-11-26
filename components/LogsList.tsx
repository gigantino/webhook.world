import { PrismaClient } from "@prisma/client";
import Message from "./Message";
const prisma = new PrismaClient();

interface LogsListProps {
  webhookId: string;
}

export default async function LogsList({ webhookId }: LogsListProps) {
  const messages = await prisma.messages.findMany({
    where: { webhook: webhookId },
  });
  const webhook = await prisma.webhooks.findFirst({
    where: { id: webhookId },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h1 className="font-bold">{webhook?.name}</h1>
        <span className="text-sm font-light text-gray-500">{webhookId}</span>
      </div>
      <hr />
      {messages?.map((msg) => (
        <Message
          key={msg.id}
          content={msg.content}
          created_at={msg.created_at}
        />
      ))}
    </div>
  );
}
