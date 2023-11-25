import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {session ? (
        <h1 className="text-5xl">Welcome! You are logged in!</h1>
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </div>
  );
}
