import type { LoanStatus } from "@/types/api-response/loan";

interface StatusStyle {
  label: string;
  badge: string;
  dot: string;
}

export const STATUS_STYLES: Record<LoanStatus, StatusStyle> = {
  pending: { label: "Pending", badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-400" },
  applied: { label: "Applied", badge: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-400" },
  sanctioned: { label: "Sanctioned", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  disbursed: { label: "Disbursed", badge: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500" },
  closed: { label: "Closed", badge: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-[#0F2C4C]" },
  rejected: { label: "Rejected", badge: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
};