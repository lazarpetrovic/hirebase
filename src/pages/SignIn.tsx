import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import google from "../assets/icons8-google-16.svg";
import github from "../assets/github.png";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err: unknown) {
            const message = err && typeof err === "object" && "code" in err
                ? (err as { code: string }).code === "auth/invalid-credential"
                    ? "Invalid email or password."
                    : (err as { code: string }).code === "auth/invalid-email"
                        ? "Invalid email address."
                        : (err as { message?: string }).message ?? "Sign in failed. Try again."
                : "Sign in failed. Try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleSignIn = async () => {
        setError("");
        setGoogleLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/dashboard");
        } catch (err: unknown) {
            const code = err && typeof err === "object" && "code" in err ? (err as { code: string }).code : "";
            const message =
                code === "auth/popup-closed-by-user"
                    ? "Sign-in was cancelled."
                    : code === "auth/popup-blocked"
                        ? "Popup was blocked. Allow popups for this site and try again."
                        : code === "auth/cancelled-popup-request"
                            ? ""
                            : "Google sign-in failed. Try again.";
            if (message) setError(message);
        } finally {
            setGoogleLoading(false);
        }
    };

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
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#e2e8f0]" />
                        </div>
                        <div className="relative flex justify-center text-[13px]">
                            <span className="px-3 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={googleLoading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-gray-700 hover:bg-[#f8fafc] transition-all shadow-sm hover:shadow-md text-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <img src={google} alt="Google" className="w-4 h-4" />
                            {googleLoading ? "Signing in…" : "Google"}
                        </button>
                        <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-gray-700 hover:bg-[#f8fafc] transition-all shadow-sm hover:shadow-md text-md">
                           <img src={github} alt="GitHub" className="w-4 h-4" />
                           GitHub
                        </button>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500 mt-6">
                    <p className="font-light">Don't have an account? <Link to="/signup" className="text-[#3b82f6] hover:text-[#2563EB] transition-colors">Sign Up for free</Link></p>
                </div>
            </div>
        </div>
        
    )
}