import { Search } from "lucide-react";
import { Plus } from "lucide-react";

export default function Topbar() {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }

    return (
        <div className="fixed h-16 top-0 left-0 right-0 z-50 bg-white border-b border-[#e2e8f0] md:left-64 overflow-hidden">
            <div className="flex items-center justify-between px-4 h-full gap-4">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                        <input type="text" onChange={handleSearch} placeholder="Search" className="w-full h-full pl-10 pr-4 py-2 rounded-md border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300" />
                    </div>
                </div>
                <div>
                    <button className="px-4 py-2 rounded-md bg-[#3b82f6] text-white hover:bg-[#2563EB] transition-all duration-300 inline-flex items-center gap-2">
                        <Plus size={16} />Add application
                    </button>
                </div>
            </div>
        </div>
    )
}