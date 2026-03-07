import { MenuIcon, Search, X, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../SearchContext";

interface TopbarProps {
    handleOpenAddApplicationModal: () => void;
    mobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
}

export default function Topbar({ handleOpenAddApplicationModal, mobileMenuOpen, onToggleMobileMenu }: TopbarProps) {
    const { searchQuery, setSearchQuery } = useSearch();
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";

    return (
        <div className="fixed h-16 top-0 left-0 right-0 z-30 bg-white border-b border-[#e2e8f0] md:left-64 overflow-hidden">
            <div className="flex items-center justify-between px-4 h-full gap-4">
                <div className="md:hidden flex-shrink-0">
                    <button
                        type="button"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        onClick={onToggleMobileMenu}
                        className="p-2 rounded-lg hover:bg-[#f1f5f9] text-gray-600"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>
                <div className="flex-1 min-w-0 max-w-md">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search applications…"
                            className="w-full h-full pl-10 pr-4 py-2 rounded-md border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
                        />
                    </div>
                </div>
                {isDashboard && (
                    <div className="hidden md:flex flex-shrink-0">
                        <button onClick={handleOpenAddApplicationModal} className="px-4 py-2 rounded-2xl bg-[#3b82f6] text-white hover:bg-[#2563EB] transition-all duration-300 inline-flex items-center gap-2">
                            <Plus size={16} />Add application
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}