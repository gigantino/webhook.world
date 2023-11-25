"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full flex justify-center items-center p-2 border-b h-16">
      <div className="flex justify-between w-full max-w-screen-lg items-center">
        <Link href="/" className="text-xl font-extrabold">
          🌎 webhook.world
        </Link>
        {status == "loading" ? (
          <Skeleton className="w-[150px] h-[20px] rounded-full" />
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
