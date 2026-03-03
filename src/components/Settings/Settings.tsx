import { useState } from "react";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import DataSection from "./DataSection";
import { User, Lock, Database } from "lucide-react";

type SettingsTab = "profile" | "security" | "data";

const menuItems: { id: SettingsTab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "data", label: "Data", icon: Database },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <nav className="md:w-56 flex-shrink-0">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
                <p className="text-sm text-gray-500 mb-6">Manage your account.</p>
                <ul className="space-y-0.5">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                type="button"
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                                    activeTab === item.id
                                        ? "bg-[#EFF6FF] text-[#3B82F6]"
                                        : "text-gray-600 hover:bg-[#f8fafc] hover:text-gray-900"
                                }`}
                            >
                                <item.icon size={20} className="flex-shrink-0" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex-1 min-w-0">
                {activeTab === "profile" && <ProfileSection />}
                {activeTab === "security" && <SecuritySection />}
                {activeTab === "data" && <DataSection />}
            </div>
        </div>
    );
}
