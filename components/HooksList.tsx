import NewHookDialog from "./NewHookDialog";
import { Input } from "./ui/input";

interface HooksListProps {}

export default function HooksList({}: HooksListProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between gap-2">
        <Input placeholder="Search" disabled={true} />
        <NewHookDialog />
      </div>
    </div>
  );
}
