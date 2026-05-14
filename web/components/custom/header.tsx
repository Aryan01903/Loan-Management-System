"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios";
import axios from "axios";

interface AuthForm {
  name?: string;
  email: string;
  password: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [form, setForm] = useState<AuthForm>({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (type: "login" | "register") => {
    setModal(type);
    setForm({ name: "", email: "", password: "" });
    setError(null);
  };

  const closeModal = () => {
    setModal(null);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const body =
        modal === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const url = modal === "login" ? "/user/login" : "/user/register";

      const res = await axiosInstance.post(url, body);

      localStorage.setItem("token", res.data.data.token);
      closeModal();
    } 
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Request failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed z-50 inset-x-0 transition-all duration-700",
          isScrolled ? "top-4 px-2 sm:px-5 md:px-8" : "top-34 sm:top-28 md:top-22",
        )}
      >
        <nav>
          <div
            className={cn(
              "px-8 sm:px-[4.5%] w-full lg:px-[2%] xl:px-[5%] flex items-center justify-between transition-all bg-white border border-gray-300",
              "h-20 gap-2",
              isScrolled
                ? "rounded-full md:h-[90px] lg:h-[100px]"
                : "rounded-none md:h-[80px] lg:h-[100px]"
            )}
          >
            <Link
              href="/"
              className="text-text-4xl lg:text-5xl font-bold italic text-primary"
            >
              CREDAXIS
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal("login")}
                className="px-5 py-2 text-sm font-medium border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => openModal("register")}
                className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-full hover:opacity-90 transition-all duration-300"
              >
                Register
              </button>
            </div>
          </div>
        </nav>
      </header>

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {modal === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <div className="flex flex-col gap-4">
              {modal === "register" && (
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Please wait..." : modal === "login" ? "Login" : "Register"}
              </button>

              <p className="text-sm text-center text-gray-500">
                {modal === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => openModal(modal === "login" ? "register" : "login")}
                  className="text-primary font-medium hover:underline"
                >
                  {modal === "login" ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}