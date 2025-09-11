"use client";

import { useLogin } from "@/services/hooks/useApiQueries";
import {
  useAuthLoading,
  useIsAuthenticated,
  useUser,
} from "@/stores/user-store";
import { useState } from "react";

export default function AuthTest() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleLogin = () => {
    loginMutation.mutate({ userName, password });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>

      {!isAuthenticated ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loginMutation.isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
          {loginMutation.error && (
            <p className="text-red-500">{loginMutation.error.message}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-xl">Welcome, {user?.userName}!</h2>
          <p>Email: {user?.email}</p>
          <p>Balance: ₦{user?.balance}</p>
          <p>User Type: {user?.userType}</p>
          <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
