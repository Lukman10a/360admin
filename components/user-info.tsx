"use client";

import {
  useUser,
  useUserBalance,
  useUserEmail,
  useUserName,
  useUserType,
} from "@/stores/user-store";
import { User } from "lucide-react";

export default function UserInfo() {
  const user = useUser();
  const userName = useUserName();
  const userEmail = useUserEmail();
  const userBalance = useUserBalance();
  const userType = useUserType();

  if (!user) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Not logged in</p>
        </div>
      </div>
    );
  }

  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="text-sm font-medium text-indigo-600">
          {userInitials}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
        {userType && (
          <p className="text-xs text-indigo-600 capitalize">{userType}</p>
        )}
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-gray-900">
          ₦
          {userBalance.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-xs text-gray-500">Balance</p>
      </div>
    </div>
  );
}
