import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { User } from "lucide-react";

export default function ProfileSection() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name ?? "");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setMessage(null);
        setSaving(true);
        try {
            await updateDoc(doc(db, "users", user.uid), { name: name.trim() });
            setMessage({ type: "success", text: "Profile updated. Refreshing…" });
            window.location.reload();
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Could not update profile. Try again." });
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
                <p className="text-sm text-gray-500">Update your display name and view your email.</p>
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
                    <label htmlFor="settings-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="settings-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]"
                            placeholder="Your name"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-600 text-sm py-2">{user?.email || "—"}</p>
                    <p className="text-xs text-gray-400">Email is managed by your sign-in provider and cannot be changed here.</p>
                </div>
                <button
                    type="submit"
                    disabled={saving || !name.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {saving ? "Saving…" : "Save changes"}
                </button>
            </form>
        </section>
    );
}
