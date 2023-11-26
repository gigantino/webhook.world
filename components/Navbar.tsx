"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Github } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex h-16 w-full items-center justify-center border-b p-2  ">
      <div className="flex w-full max-w-screen-lg items-center justify-between">
        <Link href="/" className="text-xl font-extrabold">
          🌎 webhook.world
        </Link>
        {status == "loading" ? (
          <Skeleton className="h-[20px] w-[150px] rounded-full" />
        ) : (
          <div>
            {session && session.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="hover:cursor-pointer">
                    <AvatarImage
                      src={session.user.image as string}
                      alt="PLACEHOLDER"
                    />
                    <AvatarFallback>
                      {(session.user.name as string)[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              >
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
