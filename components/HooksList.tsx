import { Input } from "./ui/input";
import NewHookDialog from "./NewHookDialog";

interface HooksListProps { }

export default function HooksList({ }: HooksListProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full justify-between gap-2">
        <Input placeholder="Search" disabled={true} />
        <NewHookDialog />
      </div>
    </div>
  );
}
