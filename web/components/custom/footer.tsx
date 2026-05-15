"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-10 md:mt-20">
      <div className="px-[6%] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="flex items-center justify-between gap-6">
        <h2 className="text-xl md:text-3xl font-bold italic text-primary">CREDAXIS</h2>

          <Link
            href="https://github.com/Aryan01903"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary transition-colors duration-200"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/aryan-kumar-shrivastav-638831268/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary transition-colors duration-200"
          >
            LinkedIn
          </Link>
        </div>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Credaxis. All rights reserved.
        </p>

      </div>
    </footer>
  );
}