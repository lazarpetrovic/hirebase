import { BarChart3, Briefcase, LayoutDashboard, Settings, User } from "lucide-react";
import { useAuth } from "../../AuthContext";

export default function Sidebar() {

    const { user } = useAuth();

    console.log(user);

    if (!user) {
        return null;
    }
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "applications", label: "Applications", icon: Briefcase },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "settings", label: "Settings", icon: Settings },
      ];
      
    return (
        <div className="fixed flex flex-col h-screen left-0 top-0 w-64 bg-white border-r border-[#e2e8f0] overflow-hidden">
            <div className="flex items-center justify-center h-16 border-b border-[#e2e8f0]">
                <h1 className="text-2xl text-gray-900 font-bold">Hirebase</h1>
            </div>
            <nav className="flex-1 pt-4">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.id} className="group flex items-center justify-start gap-2 p-4 hover:bg-[#f8fafc] transition-colors cursor-pointer">
                            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#3B82F6]/10">
                                <item.icon size={20} className="text-[#3B82F6] group-hover:rotate-45 transition-transform duration-300"/>
                            </div>
                            <span className="text-gray-600 group-hover:text-[#3B82F6] transition-colors duration-300">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex items-center justify-center h-20 border-t border-[#e2e8f0]">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3B82F6]/10">
                        <User size={20} className="text-[#3B82F6]"/>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span className="text-gray-900 text-md font-medium">{user.name}</span>
                        <span className="text-gray-600 text-sm">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}