import { useState } from "react";
import { auth } from "../../firebase";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function SecuritySection() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match." });
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: "error", text: "New password must be at least 6 characters." });
            return;
        }
        const firebaseUser = auth.currentUser;
        if (!firebaseUser?.email) {
            setMessage({ type: "error", text: "You must be signed in with email to change password." });
            return;
        }
        setLoading(true);
        try {
            const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
            await reauthenticateWithCredential(firebaseUser, credential);
            await updatePassword(firebaseUser, newPassword);
            setMessage({ type: "success", text: "Password updated successfully." });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: unknown) {
            const code = err && typeof err === "object" && "code" in err ? (err as { code: string }).code : "";
            const text =
                code === "auth/wrong-password" || code === "auth/invalid-credential"
                    ? "Current password is incorrect."
                    : code === "auth/weak-password"
                        ? "New password is too weak."
                        : "Could not update password. Try again.";
            setMessage({ type: "error", text });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                <p className="text-sm text-gray-500">Change your password.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {message && (
                    <div
                        className={`p-3 rounded-xl text-sm ${
                            message.type === "success"
                                ? "bg-green-50 text-green-800 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
                <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current password
                    </label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            id="current-password"
                            type={showCurrent ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                            title={showCurrent ? "Hide password" : "Show password"}
                            aria-label={showCurrent ? "Hide password" : "Show password"}
                        >
                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        New password
                    </label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            id="new-password"
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]"
                            placeholder="At least 6 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                            title={showNew ? "Hide password" : "Show password"}
                            aria-label={showNew ? "Hide password" : "Show password"}
                        >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm new password
                    </label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            id="confirm-password"
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                            title={showConfirm ? "Hide password" : "Show password"}
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Updating…" : "Update password"}
                </button>
            </form>
        </section>
    );
}
