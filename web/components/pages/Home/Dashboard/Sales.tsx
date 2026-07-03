"use client";

import { useEffect, useState } from "react";
import { getSalesLeads } from "@/api/loan";
import type { IUser } from "@/types/api-response/user";

export default function SalesDashboard() {
  const [leads, setLeads] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const res = await getSalesLeads();
        setLeads(res || []);
      } catch (err) {
        console.error("Failed to fetch leads", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#0F2C4C]">Sales</h1>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
          {leads.length} leads
        </span>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 rounded-xl border border-slate-200 bg-slate-50 animate-pulse" />
          ))}
        </div>
      ) : leads.length === 0 ? (
        <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl px-4 py-8 text-center">
          No registered users pending application yet
        </p>
      ) : (
        <div className="grid gap-3">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="flex items-center justify-between border border-slate-200 rounded-xl p-4 bg-white"
            >
              <div>
                <p className="text-sm font-semibold text-[#0F2C4C]">{lead.name}</p>
                <p className="text-xs text-slate-400">{lead.email}</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Not applied yet
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}