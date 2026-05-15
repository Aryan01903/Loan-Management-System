"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { useAuth } from "@/utils/store/authStore";

type Mode = "login" | "register";

interface Props {
  mode: Mode;
  onClose: () => void;
  switchMode: (mode: Mode) => void;
}

export default function AuthModal({ mode, onClose, switchMode }: Props) {
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "borrower",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : form;

      const url = mode === "login" ? "/user/login" : "/user/register";

      const res = await axiosInstance.post(url, body);

      login(res.data.data);
      onClose();

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Request failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        <div className="flex flex-col gap-4">
          {mode === "register" && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="input"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input"
              >
                <option value="borrower">Borrower</option>
                <option value="sales">Sales</option>
                <option value="sanction">Sanction</option>
                <option value="disbursement">Disbursement</option>
                <option value="collection">Collection</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-white py-3 rounded-xl"
          >
            {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
          </button>

          <p className="text-sm text-center">
            {mode === "login" ? "No account?" : "Already have account?"}
            <button
              onClick={() =>
                switchMode(mode === "login" ? "register" : "login")
              }
              className="text-primary ml-1"
            >
              {mode === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}