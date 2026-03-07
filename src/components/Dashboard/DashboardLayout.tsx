import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, LayoutDashboard, LogOut, Pencil, Settings, User, BarChart2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../../SearchContext";
import { useAuth } from "../../AuthContext";
import { auth } from "../../firebase";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleOpenAddApplicationModal = () => {
        navigate("/dashboard", { state: { openAddModal: true } });
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    const handleSignOut = () => {
        signOut(auth);
        navigate("/signin");
        closeMobileMenu();
    };

    const navItem = (id: string, label: string, icon: React.ComponentType<{ size?: number }>, to: string, end?: boolean) => ({ id, label, icon, to, end: end ?? false });
    const desktopItems = [
        navItem("dashboard", "Dashboard", LayoutDashboard, "/dashboard", true),
        navItem("applications", "Applications", Briefcase, "/dashboard/applications"),
        navItem("settings", "Settings", Settings, "/dashboard/settings"),
    ];
    const mobileOnlyItem = navItem("analytics", "Analytics", BarChart2, "/dashboard/analytics");

    return (
        <SearchProvider>
            <div className="min-h-screen bg-[#f8fafc]">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <Topbar
                    handleOpenAddApplicationModal={handleOpenAddApplicationModal}
                    mobileMenuOpen={mobileMenuOpen}
                    onToggleMobileMenu={() => setMobileMenuOpen((o) => !o)}
                />
                {/* Mobile menu overlay + drawer (below Topbar z-30 so menu button stays clickable) */}
                <div className={`md:hidden fixed inset-0 z-20 ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                    {mobileMenuOpen && (
                        <button
                            type="button"
                            aria-label="Close menu"
                            className="absolute inset-0 bg-black/50 z-0"
                            onClick={closeMobileMenu}
                        />
                    )}
                    <div
                        className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#e2e8f0] z-10 flex flex-col transition-transform duration-200 ease-out ${
                            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <div className="flex items-center justify-center h-16 border-b border-[#e2e8f0]">
                            <h1 className="text-xl font-bold text-gray-900">Hirebase</h1>
                        </div>
                        <nav className="flex-1 pt-4 overflow-auto">
                            <ul>
                                {desktopItems.map((item) => (
                                    <li key={item.id}>
                                        <NavLink
                                            to={item.to}
                                            end={item.end}
                                            onClick={closeMobileMenu}
                                            className={({ isActive }) =>
                                                `group flex items-center gap-2 p-4 transition-colors ${isActive ? "bg-[#EFF6FF] text-[#3B82F6]" : "hover:bg-[#f8fafc] text-gray-600"}`
                                            }
                                        >
                                            <span className="shrink-0 text-[#3B82F6]"><item.icon size={20} /></span>
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </li>
                                ))}
                                <li className="md:hidden">
                                    <NavLink
                                        to={mobileOnlyItem.to}
                                        end={false}
                                        onClick={closeMobileMenu}
                                        className={({ isActive }) =>
                                            `group flex items-center gap-2 p-4 transition-colors ${isActive ? "bg-[#EFF6FF] text-[#3B82F6]" : "hover:bg-[#f8fafc] text-gray-600"}`
                                        }
                                    >
                                        <span className="shrink-0 text-[#3B82F6]"><mobileOnlyItem.icon size={20} /></span>
                                        <span>{mobileOnlyItem.label}</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        {user && (
                            <div className="border-t border-[#e2e8f0] p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                                        <User size={20} className="text-[#3B82F6]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <NavLink
                                        to="/dashboard/settings"
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:bg-[#f8fafc] rounded-lg"
                                    >
                                        <Pencil size={14} /> Edit
                                    </NavLink>
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg"
                                    >
                                        <LogOut size={14} /> Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <main className="mt-16 md:ml-70 max-w-[1400px] mx-auto p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </SearchProvider>
    );
}
