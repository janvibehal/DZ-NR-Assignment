"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LucideIcon } from "lucide-react";
import { useAuth } from "../../../context/AuthContext"; 

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
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-150 text-sm"
    />
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
  </div>
);

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      setMessage({ type: "success", text: "Logged in successfully!" });
      setTimeout(() => router.push("/"), 1000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  const MessageModal: React.FC<{ text: string; type: "success" | "error"; onClose: () => void }> = ({ text, type, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
        <h3 className={`text-lg font-bold ${type === "success" ? "text-green-600" : "text-red-600"} mb-3`}>
          {type === "success" ? "Success" : "Error"}
        </h3>
        <p className="text-gray-700 text-sm mb-4">{text}</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition duration-150"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center w-full font-sans" suppressHydrationWarning>
      {message && <MessageModal text={message.text} type={message.type} onClose={() => setMessage(null)} />}
    </div>
  );
}
