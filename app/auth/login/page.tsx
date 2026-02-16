"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { User, Lock, LucideIcon } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

interface AuthInputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  Icon: LucideIcon;
}

const AuthInput: React.FC<AuthInputProps> = ({ type, placeholder, value, onChange, Icon }) => (
  <div className="relative">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/30
                 focus:outline-none focus:ring-2 focus:ring-white/70 text-sm text-gray-800 placeholder-gray-500"
    />
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
  </div>
);

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/login-bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY (optional, subtle) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* GLASS CARD */}
      <div className="relative z-10 w-full max-w-4xl mx-4 rounded-3xl
                      bg-white/20 backdrop-blur-sm border border-white/30
                      shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                      flex flex-col md:flex-row overflow-hidden">

        {/* LEFT VISUAL */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10 text-white">
          <div>
            <h2 className="text-3xl font-semibold mb-3">Welcome Back</h2>
            <p className="text-sm text-white/80">
              Securely access your account and continue where you left off.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:w-1/2 p-8 md:p-12">
          <form onSubmit={handleLogin} className="space-y-6">
            <AuthInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              Icon={User}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              Icon={Lock}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium text-white
                         bg-white/20 backdrop-blur-md border border-white/30
                         hover:bg-white/30 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-white/80">
              Don’t have an account?{" "}
              <Link href="/auth/signup" className="underline hover:text-white">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
