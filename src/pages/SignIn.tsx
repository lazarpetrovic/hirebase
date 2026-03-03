import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err: unknown) {
            const code = err && typeof err === "object" && "code" in err ? (err as { code: string }).code : "";
            const message =
                code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password"
                    ? "Invalid email or password."
                    : code === "auth/invalid-email"
                        ? "Please enter a valid email address."
                        : code === "auth/too-many-requests"
                            ? "Too many failed attempts. Please try again later or reset your password."
                            : code === "auth/user-disabled"
                                ? "This account has been disabled."
                                : typeof err === "object" && err !== null && "message" in err
                                    ? String((err as { message: unknown }).message)
                                    : "Sign in failed. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#ffffff] flex items-center justify-center px-6 py-20">
            <div className="w-full max-w-[480px]">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block text-3xl font-medium text-gray-900 mb-6">Hirebase</Link>
                    <h2 className="text-4xl font-medium text-gray-900 mb-2 tracking-tight">Welcome back</h2>
                    <p className="text-gray-600 font-light text-lg">Sing in to continue tracking your job applications</p>
                </div>
                <div className="border border-[#e2e8f0] rounded-2xl p-8 shadow-xl bg-white">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <Mail size={18} className="text-gray-400"/>
                                </div>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-300" placeholder="Email" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <a href="#" className="text-sm text-[#3b82f6] hover:text-[#2563EB] font-light transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative"> 
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <Lock size={18} className="text-gray-400"/>
                                </div>
                                <input type={visiblePassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-300" placeholder="Password" />
                                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => setVisiblePassword(!visiblePassword)}>
                                    {visiblePassword ? <Eye size={18} className="text-gray-400"/> : <EyeOff size={18} className="text-gray-400"/>}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                            />
                            <label htmlFor="remember" className="ml-2 text-[14px] text-gray-700">
                                Remember me for 30 days
                            </label>
                        </div>
                        <div className="mb-4">
                            <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-xl bg-[#3b82f6] text-white hover:bg-[#2563EB] transition-colors shadow-sm hover:shadow-md text-[15px] disabled:opacity-70 disabled:cursor-not-allowed">
                                {loading ? "Signing in…" : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center text-sm text-gray-500 mt-6">
                    <p className="font-light">Don't have an account? <Link to="/signup" className="text-[#3b82f6] hover:text-[#2563EB] transition-colors">Sign Up for free</Link></p>
                </div>
            </div>
        </div>
        
    )
}