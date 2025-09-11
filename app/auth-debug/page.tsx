"use client";

import { useLogin } from "@/services/hooks/useAuth";
import {
  useAuthLoading,
  useIsAuthenticated,
  useUser,
} from "@/stores/user-store";
import { useState } from "react";

export default function AuthDebugPage() {
  const [userName, setUserName] = useState("testing@gmail.com");
  const [password, setPassword] = useState("testing");

  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();
  const loginMutation = useLogin();

  const handleLogin = async () => {
    console.log("Login button clicked");
    try {
      await loginMutation.mutateAsync({ userName, password });
      console.log("Login completed successfully");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>

      <div className="space-y-4 mb-6">
        <div>
          <strong>Auth Status:</strong>
          <ul className="ml-4 text-sm">
            <li>User: {user ? "✅ Present" : "❌ Null"}</li>
            <li>Authenticated: {isAuthenticated ? "✅ True" : "❌ False"}</li>
            <li>Loading: {isLoading ? "⏳ True" : "✅ False"}</li>
          </ul>
        </div>

        {user && (
          <div>
            <strong>User Data:</strong>
            <pre className="text-xs bg-gray-100 p-2 rounded mt-2">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleLogin}
          disabled={loginMutation.isPending}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {loginMutation.error && (
          <div className="text-red-500 text-sm">
            Error: {loginMutation.error.message}
          </div>
        )}
      </div>

      <div className="mt-6 text-xs">
        <p>Open browser console to see debug logs</p>
      </div>
    </div>
  );
}
