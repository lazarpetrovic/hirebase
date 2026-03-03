import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../../SearchContext";

export default function DashboardLayout() {
    const navigate = useNavigate();

    const handleOpenAddApplicationModal = () => {
        navigate("/dashboard", { state: { openAddModal: true } });
    };

    return (
        <SearchProvider>
            <div className="min-h-screen bg-[#f8fafc]">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <Topbar handleOpenAddApplicationModal={handleOpenAddApplicationModal} />
                <main className="mt-16 md:ml-70 max-w-[1400px] mx-auto p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </SearchProvider>
    );
}
