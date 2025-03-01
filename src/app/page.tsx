"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });

    if (!result?.ok) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        <p>Or sign in with:</p>
        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
