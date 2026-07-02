"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/utils/store/authStore";
import AuthModal from "../modal/authModal";

export default function Header() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="fixed top-4 w-full z-50 px-[6%]">
        <div className="flex justify-between items-center px-6 sm:px-7 py-3.5 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-[0_2px_20px_-4px_rgba(15,23,42,0.08)] relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0F2C4C] text-[#E8A33D] font-black text-base sm:text-lg leading-none">
              C
            </span>
            <span className="text-xl xs:text-2xl md:text-[26px] font-extrabold tracking-tight text-[#0F2C4C]">
              CRED<span className="text-[#E8A33D]">AXIS</span>
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => setModal("login")}
                  className="px-5 py-2.5 text-sm font-semibold text-[#0F2C4C] rounded-lg border border-slate-200 hover:border-[#0F2C4C]/30 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                >
                  Log in
                </button>
                <button
                  onClick={() => setModal("register")}
                  className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-[#0F2C4C] hover:bg-[#0c2340] shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] transition-colors duration-150 cursor-pointer"
                >
                  Get started
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8A33D]/15 text-[#0F2C4C] text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                    {user?.name ?? "Account"}
                  </span>
                </span>
                <button
                  onClick={logout}
                  className="px-5 py-2.5 text-sm font-semibold text-[#0F2C4C] rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors duration-150"
            onClick={() => setOpenMenu((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={openMenu}
          >
            <span className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-[2px] w-full bg-[#0F2C4C] rounded-full transition-transform duration-200 ${
                  openMenu ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-[#0F2C4C] rounded-full transition-opacity duration-150 ${
                  openMenu ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-[#0F2C4C] rounded-full transition-transform duration-200 ${
                  openMenu ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          {/* Mobile menu */}
          {openMenu && (
            <div className="absolute right-4 top-[calc(100%+8px)] w-48 bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_-6px_rgba(15,23,42,0.15)] flex flex-col p-1.5 sm:hidden">
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setModal("login");
                      setOpenMenu(false);
                    }}
                    className="py-2.5 text-left text-sm font-medium text-[#0F2C4C] hover:bg-slate-50 rounded-lg px-3 cursor-pointer transition-colors duration-150"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setModal("register");
                      setOpenMenu(false);
                    }}
                    className="py-2.5 text-left text-sm font-medium text-white bg-[#0F2C4C] hover:bg-[#0c2340] rounded-lg px-3 mt-1 cursor-pointer transition-colors duration-150"
                  >
                    Get started
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 mb-1 border-b border-slate-100">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8A33D]/15 text-[#0F2C4C] text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </span>
                    <span className="text-sm font-medium text-slate-700 truncate">
                      {user?.name ?? "Account"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setOpenMenu(false);
                    }}
                    className="py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg px-3 cursor-pointer transition-colors duration-150"
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          switchMode={(m) => setModal(m)}
        />
      )}
    </>
  );
}