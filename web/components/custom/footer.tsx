"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-16 md:mt-24 bg-white">
      <div className="px-[6%] py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-[#0F2C4C] text-[#E8A33D] font-black text-sm leading-none">
              C
            </span>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-[#0F2C4C]">
              CRED<span className="text-[#E8A33D]">AXIS</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400">
            Fast, transparent lending — built for everyone.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/Aryan01903"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-[#0F2C4C] transition-colors duration-150"
          >
            GitHub
          </Link>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <Link
            href="https://www.linkedin.com/in/aryan-kumar-shrivastav-638831268/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-[#0F2C4C] transition-colors duration-150"
          >
            LinkedIn
          </Link>
        </div>

        <p className="text-xs text-slate-400 order-last md:order-none">
          © {new Date().getFullYear()} Credaxis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}