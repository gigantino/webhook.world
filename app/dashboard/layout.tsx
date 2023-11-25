import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session || !session.user) return redirect("/");
  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <div className="w-full p-2 justify-center flex">
        <div className="w-full max-w-screen-lg">{children}</div>
      </div>
    </div>
  );
}
