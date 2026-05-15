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
        <div className="flex justify-between items-center px-[4%] py-4 bg-white border border-gray-300 rounded-2xl shadow-md relative">
          <Link href="/" className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold italic text-primary">
            CREDAXIS
          </Link>

          <div className="hidden sm:flex gap-3">
            {!user ? (
              <>
                <button onClick={() => setModal("login")} className="btn-outline cursor-pointer">
                  Login
                </button>
                <button onClick={() => setModal("register")} className="btn cursor-pointer">
                  Register
                </button>
              </>
            ) : (
              <button onClick={logout} className="btn cursor-pointer">
                Logout
              </button>
            )}
          </div>

          <button
            className="sm:hidden text-xl"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            ☰
          </button>

          {openMenu && (
            <div className="absolute right-4 top-16 w-40 bg-white border border-gray-500 rounded-xl shadow-lg flex flex-col p-2 sm:hidden transition-all duration-200 ease-in-out">
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setModal("login");
                      setOpenMenu(false);
                    }}
                    className="py-2 text-left hover:bg-gray-100 rounded px-2 cursor-pointer"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setModal("register");
                      setOpenMenu(false);
                    }}
                    className="py-2 text-left hover:bg-gray-100 rounded px-2 cursor-pointer"
                  >
                    Register
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setOpenMenu(false);
                  }}
                  className="py-2 text-left hover:bg-gray-100 rounded px-2"
                >
                  Logout
                </button>
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