"use client";

import { useAuth } from "@/utils/store/authStore";

export default function Protected({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) {
  const { user } = useAuth();

  if (!user) return <p>Please login</p>;

  if (!roles.includes(user.role)) {
    return (
      <p className="text-red-500">
        ❌ Unauthorized Access
      </p>
    );
  }

  return <>{children}</>;
}