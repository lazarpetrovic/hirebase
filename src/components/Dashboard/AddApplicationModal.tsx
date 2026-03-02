import { X } from "lucide-react";
import { useEffect, useState } from "react";

type NewApplicationData = {
    company: string;
    position: string;
    location: string;
    dateApplied: string;
    status: string;
};

const defaultDate = () => new Date().toISOString().slice(0, 10);

export default function AddApplicationModal({ columns, isOpen, onClose, handleAddApplication }: { columns: { id: string; title: string; color: string }[]; isOpen: boolean; onClose: () => void; handleAddApplication: (data: NewApplicationData) => void }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [dateApplied, setDateApplied] = useState(defaultDate());
    const [status, setStatus] = useState(columns[0]?.id ?? "wishlist");

    useEffect(() => {
        if (isOpen) {
            setCompany("");
            setPosition("");
            setLocation("");
            setDateApplied(defaultDate());
            setStatus(columns[0]?.id ?? "wishlist");
        }
    }, [isOpen, columns]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!company.trim() || !position.trim()) return;
        handleAddApplication({ company: company.trim(), position: position.trim(), location: location.trim(), dateApplied, status });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Add Application</h2>
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="mb-4 space-y-1">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                        <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Google" required className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4 space-y-1">
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                        <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g., Software Engineer" required className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4 space-y-1">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., San Francisco, CA" className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4 space-y-1">
                        <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700">Date Applied</label>
                        <input type="date" id="dateApplied" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-4 space-y-1">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>{column.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <button type="submit" className="w-full px-4 py-2 bg-[#3B82F6] text-white shadow-md rounded-xl hover:bg-[#2563EB] transition-colors">Add Application</button>
                        <button type="button" onClick={onClose} className="w-full px-4 py-2 bg-gray-500 shadow-md text-white rounded-xl hover:bg-gray-600 transition-colors">Cancel</button>
                    </div>  
                </form>
            </div>
        </div>
    )
}