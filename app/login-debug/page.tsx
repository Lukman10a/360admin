"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/services/hooks/useAuth";
import { useUserStore } from "@/stores/user-store";
import { useState } from "react";

export default function LoginDebugPage() {
  const [credentials, setCredentials] = useState({
    userName: "testing@gmail.com",
    password: "testing",
  });

  const loginMutation = useLogin();
  const { user, isAuthenticated } = useUserStore();

  const handleTestLogin = async () => {
    try {
      console.log("=== STARTING LOGIN DEBUG ===");
      console.log("Credentials:", credentials);

      const result = await loginMutation.mutateAsync(credentials);

      console.log("=== LOGIN RESPONSE ===");
      console.log("Full response:", result);
      console.log("Response type:", typeof result);
      console.log("Response keys:", Object.keys(result || {}));

      if (result?.data) {
        console.log("Response.data:", result.data);
        console.log("Response.data type:", typeof result.data);
        console.log("Response.data keys:", Object.keys(result.data || {}));
      }

      if (result?.token) {
        console.log("Token exists:", !!result.token);
        console.log("Token length:", result.token?.length);
      }

      console.log("=== AFTER LOGIN - STORE STATE ===");
      setTimeout(() => {
        console.log("Store user:", useUserStore.getState().user);
        console.log(
          "Store isAuthenticated:",
          useUserStore.getState().isAuthenticated
        );
        console.log(
          "LocalStorage auth_token:",
          localStorage.getItem("auth_token")
        );
        console.log(
          "LocalStorage user-store:",
          localStorage.getItem("user-store")
        );
      }, 100);
    } catch (error) {
      console.error("=== LOGIN ERROR ===", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Login Debug</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Current Store State</h2>
          <div className="space-y-2 text-sm">
            <div>User: {user ? JSON.stringify(user, null, 2) : "null"}</div>
            <div>Is Authenticated: {String(isAuthenticated)}</div>
            <div>
              Auth Token:{" "}
              {localStorage.getItem("auth_token") ? "EXISTS" : "NULL"}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Test Login</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username/Email"
              value={credentials.userName}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            />
            <Button
              onClick={handleTestLogin}
              disabled={loginMutation.isPending}
              className="w-full"
            >
              {loginMutation.isPending ? "Logging in..." : "Test Login"}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Open browser developer console</li>
            <li>Click "Test Login" button</li>
            <li>Check console for detailed response structure</li>
            <li>Compare with expected User interface</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
