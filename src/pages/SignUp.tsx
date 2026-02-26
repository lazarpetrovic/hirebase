import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAndPrivacy, setTermsAndPrivacy] = useState(false);

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);

    const handlePasswordLength = (password: string) => {
        if (password.length >= 8) {
            setPasswordLength(true);
        } else {
            setPasswordLength(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, password, termsAndPrivacy);
        // TODO: Implement sign up logic
        // TODO: Implement sign up logic
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#ffffff] flex items-center justify-center px-6 py-20">
            <div className="w-full max-w-[480px]">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block text-3xl font-medium text-gray-900 mb-6">Hirebase</Link>
                    <h2 className="text-4xl font-medium text-gray-900 mb-2 tracking-tight">Create your account</h2>
                    <p className="text-gray-600 font-light text-lg">Start tracking your job applications for free</p>
                </div>
                <div className="border border-[#e2e8f0] rounded-2xl p-8 shadow-xl bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <User size={18} className="text-gray-400"/>
                                </div>
                                <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-300" placeholder="Name" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <Mail size={18} className="text-gray-400"/>
                                </div>
                                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-300" placeholder="Email" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <Lock size={18} className="text-gray-400"/>
                                </div>
                                <input type={visiblePassword ? "text" : "password"} onChange={(e) => {setPassword(e.target.value), handlePasswordLength(e.target.value)}} id="password" className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-300" placeholder="Password" />
                                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => setVisiblePassword(!visiblePassword)}>
                                    {visiblePassword ? <Eye size={18} className="text-gray-400"/> : <EyeOff size={18} className="text-gray-400"/>}
                                </button>
                            </div>
                            {passwordLength || <p className="text-xs text-gray-500 font-light mt-2">Must be at least 8 characters</p>}
                        </div>
                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="terms" onChange={(e) => setTermsAndPrivacy(e.target.checked)} className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20" />
                            <label htmlFor="terms" className="ml-2 text-[14px] text-gray-700">I agree to the <Link to="/terms" className="text-[#3b82f6] hover:text-[#2563EB] transition-colors">Terms of Service</Link> and <Link to="/privacy" className="text-[#3b82f6] hover:text-[#2563EB] transition-colors">Privacy Policy</Link></label>
                        </div>
                        <button type="button" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#3b82f6] text-white hover:bg-[#2563EB] transition-colors shadow-sm hover:shadow-md text-md">Create Account</button>
                    </form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#e2e8f0]" />
                        </div>
                        <div className="relative flex justify-center text-[13px]">
                            <span className="px-3 bg-white font-light text-gray-500">Or sign up with</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-gray-700 hover:bg-[#f8fafc] transition-all shadow-sm hover:shadow-md text-md">
                            Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-gray-700 hover:bg-[#f8fafc] transition-all shadow-sm hover:shadow-md text-md">
                            Github
                        </button>
                    </div>
                </div>
                <div>
                    <p className="text-center text-sm text-gray-500 font-light mt-6 leading-relaxed">Already have an account? <Link to="/signin" className="text-[#3b82f6] hover:text-[#2563EB] transition-colors">Sign In</Link></p>
                </div>
                <div className="mt-8 border border-[#e2e8f0]/20 bg-[#22c55e]/5 rounded-xl p-4 mt-6 leading-relaxed">
                    <p className="text-sm text-center text-gray-700 font-light"><span className="font-medium text-[#22c55e]">Free forever </span>for up to 25 applications. No credit card required.</p>
                </div>
            </div>
        </div>
    )
}