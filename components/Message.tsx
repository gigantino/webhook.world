interface MessageProps {
  content: string;
  created_at: Date;
}

export default function Message({ content, created_at }: MessageProps) {
  return (
    <div className="w-full rounded-lg border p-2">
      <div className="flex flex-col gap-0.5">
        <span>{content}</span>
        <span className="text-sm font-light text-gray-500">
          {created_at.toString()}
        </span>
      </div>
    </div>
  );
}
