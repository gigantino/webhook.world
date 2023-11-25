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
import { Plus } from "lucide-react";

export default function NewHookDialog() {
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
          <div>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Crate webhook</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
