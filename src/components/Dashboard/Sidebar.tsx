import { Briefcase, LayoutDashboard, LogOut, Pencil, Settings, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../AuthContext";

export default function Sidebar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth);
        navigate("/signin");
    };

    if (!user) {
        return null;
    }
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/dashboard", end: true },
        { id: "applications", label: "Applications", icon: Briefcase, to: "/dashboard/applications", end: false },
        { id: "settings", label: "Settings", icon: Settings, to: "/dashboard/settings", end: false },
      ];
      
    return (
        <div className="fixed flex flex-col h-screen left-0 top-0 w-64 bg-white border-r border-[#e2e8f0] overflow-hidden">
            <div className="flex items-center justify-center h-16 border-b border-[#e2e8f0]">
                <h1 className="text-2xl text-gray-900 font-bold">Hirebase</h1>
            </div>
            <nav className="flex-1 pt-4">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `group flex items-center justify-start gap-2 p-4 transition-colors cursor-pointer ${isActive ? "bg-[#EFF6FF] text-[#3B82F6]" : "hover:bg-[#f8fafc] text-gray-600"}`
                                }
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#3B82F6]/10">
                                    <item.icon size={20} className="text-[#3B82F6] group-hover:rotate-45 transition-transform duration-300"/>
                                </div>
                                <span className="group-hover:text-[#3B82F6] transition-colors duration-300">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="relative group border-t border-[#e2e8f0]">
                <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute bottom-full left-2 right-2 mb-1 transition-opacity duration-200 z-10">
                    <div className="bg-white rounded-xl shadow-lg border border-[#e2e8f0] py-1 overflow-hidden">
                        <NavLink
                            to="/dashboard/settings"
                            className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-[#f8fafc] text-sm"
                        >
                            <Pencil size={16} className="text-[#3B82F6]" />
                            Edit
                        </NavLink>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-[#f8fafc] text-sm text-left"
                        >
                            <LogOut size={16} className="text-[#EF4444]" />
                            Sign out
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 h-20 cursor-pointer hover:bg-[#f8fafc] transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3B82F6]/10">
                        <User size={20} className="text-[#3B82F6]" />
                    </div>
                    <div className="flex flex-col items-start justify-center min-w-0">
                        <span className="text-gray-900 text-md font-medium truncate max-w-[140px]">{user.name}</span>
                        <span className="text-gray-600 text-sm truncate max-w-[140px]">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}