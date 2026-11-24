"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else router.push("/people");
  }

  async function handleSignIn() {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMessage(error.message);
    else router.push("/people");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Log in or sign up</h1>
        <input
          className="w-full rounded border p-2 text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2 text-black"
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="flex-1 rounded bg-purple-800 p-2 text-white disabled:opacity-50"
            onClick={handleSignIn}
            disabled={loading}
          >
            Log in
          </button>
          <button
            className="flex-1 rounded border p-2 disabled:opacity-50"
            onClick={handleSignUp}
            disabled={loading}
          >
            Sign up
          </button>
        </div>
        {message && <p className="text-sm text-red-500">{message}</p>}
      </div>
    </main>
  );
}