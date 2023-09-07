"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

const Page = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen m-auto w-4/5 mt-10">
      <p>You are logged in!</p>
      <button className="shadow-orange-100 bg-secondary rounded text-xl text-white py-2 px-4 cursor-pointer hover:bg-orange-400 hover:text-black" 
        onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </button>
    </div>
  )
}

export default Page