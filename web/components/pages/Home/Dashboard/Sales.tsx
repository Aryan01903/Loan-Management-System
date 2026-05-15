"use client";

import { useEffect, useState } from "react";
import { getSalesLeads } from "@/api/loan";

export default function SalesDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getSalesLeads();
        setUsers(res || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Sales Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading leads...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No leads found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p>
                <b>Name:</b> {u.name}
              </p>
              <p>
                <b>Email:</b> {u.email}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                👉 Lead (Not applied yet)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}