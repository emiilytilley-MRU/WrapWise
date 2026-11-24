"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function PeoplePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
      else setEmail(data.user.email ?? "");
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (email === null) return <p className="p-6">Loading...</p>;

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">My People</h1>
      <p>Logged in as {email}</p>
      <button className="rounded border px-4 py-2" onClick={handleSignOut}>
        Log out
      </button>
    </main>
  );
}
