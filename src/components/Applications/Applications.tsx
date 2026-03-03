import { useState } from "react";
import { useApplications } from "../../ApplicationsContext";
import { useSearch } from "../../SearchContext";
import type { Application } from "../../types/Application";
import { Briefcase, Search, Trash2 } from "lucide-react";

const statusLabels: Record<Application["status"], string> = {
    wishlist: "Wishlist",
    applied: "Applied",
    interview: "Interview",
    offer: "Offer",
    rejected: "Rejected",
};

const statusStyles: Record<Application["status"], string> = {
    wishlist: "bg-[#F3E8FF] text-[#9333EA]",
    applied: "bg-[#DBEAFE] text-[#3B82F6]",
    interview: "bg-[#FEF3C7] text-[#F59E0B]",
    offer: "bg-[#D1FAE5] text-[#22C55E]",
    rejected: "bg-[#FEE2E2] text-[#EF4444]",
};

function formatDate(value: string | unknown): string {
    if (typeof value === "string") return value.slice(0, 10);
    if (value && typeof value === "object" && "toDate" in value) {
        const d = (value as { toDate: () => Date }).toDate();
        return d.toISOString().slice(0, 10);
    }
    return "—";
}

export default function Applications() {
    const { applications, loading, handleDeleteApplication } = useApplications();
    const { searchQuery, setSearchQuery } = useSearch();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const onDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await handleDeleteApplication(id);
        } catch (err) {
            console.error("Failed to delete application:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const filteredApplications = applications.filter((app) => {
        const term = searchQuery.trim().toLowerCase();
        if (!term) return true;
        const company = (app.company ?? "").toLowerCase();
        const position = (app.position ?? "").toLowerCase();
        const location = (app.location ?? "").toLowerCase();
        const statusLabel = statusLabels[app.status].toLowerCase();
        return company.includes(term) || position.includes(term) || location.includes(term) || statusLabel.includes(term);
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">Loading applications…</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">Applications</h1>
                    <p className="text-gray-600">All your job applications in one list.</p>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search company, position, location, status…"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] text-gray-900 placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
                {applications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <Briefcase className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="font-medium">No applications yet</p>
                        <p className="text-sm mt-1">Add your first application from the Dashboard.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {searchQuery.trim() && (
                            <p className="px-4 py-2 text-sm text-gray-500 bg-[#f8fafc] border-b border-[#e2e8f0]">
                                Showing {filteredApplications.length} of {applications.length} applications
                            </p>
                        )}
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Company</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Position</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Location</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date applied</th>
                                    <th className="w-12 py-4 px-4" aria-label="Actions" />
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplications.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-gray-500">
                                            No applications match your search.
                                        </td>
                                    </tr>
                                ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app.id} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors">
                                        <td className="py-4 px-4 text-gray-900 font-medium">{app.company}</td>
                                        <td className="py-4 px-4 text-gray-700">{app.position}</td>
                                        <td className="py-4 px-4 text-gray-600">{app.location || "—"}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[app.status]}`}>
                                                {statusLabels[app.status]}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{formatDate(app.dateApplied)}</td>
                                        <td className="py-4 px-4">
                                            <button
                                                type="button"
                                                onClick={() => onDelete(app.id)}
                                                disabled={deletingId === app.id}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
