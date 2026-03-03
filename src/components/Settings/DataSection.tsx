import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useApplications } from "../../ApplicationsContext";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Download, Trash2 } from "lucide-react";

export default function DataSection() {
    const { user } = useAuth();
    const { applications } = useApplications();
    const navigate = useNavigate();
    const [exporting, setExporting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState("");
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const escapeCsvCell = (value: string): string => {
        const str = String(value ?? "");
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const handleExport = () => {
        setMessage(null);
        setExporting(true);
        try {
            const headers = ["id", "company", "position", "location", "status", "dateApplied"];
            const headerRow = headers.map(escapeCsvCell).join(",");
            const dataRows = applications.map((app) =>
                [
                    app.id,
                    app.company,
                    app.position,
                    app.location ?? "",
                    app.status,
                    typeof app.dateApplied === "string" ? app.dateApplied.slice(0, 10) : "",
                ].map(escapeCsvCell).join(",")
            );
            const csv = [headerRow, ...dataRows].join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `hirebase-applications-${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            setMessage({ type: "success", text: "Download started." });
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Export failed. Try again." });
        } finally {
            setExporting(false);
        }
    };

    const handleDeleteData = async () => {
        if (confirmDelete !== "DELETE" || !user) return;
        setMessage(null);
        setDeleting(true);
        try {
            const applicationsRef = collection(db, "jobApplications");
            const q = query(applicationsRef, where("userId", "==", user.uid));
            const snapshot = await getDocs(q);
            for (const d of snapshot.docs) {
                await deleteDoc(doc(db, "jobApplications", d.id));
            }
            await deleteDoc(doc(db, "users", user.uid));
            await signOut(auth);
            navigate("/signin", { replace: true });
            window.location.reload();
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Could not delete data. Try again." });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <section className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-gray-900">Data</h2>
                <p className="text-sm text-gray-500">Export or delete your data.</p>
            </div>
            <div className="p-6 space-y-6">
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

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                        <Download size={20} className="text-[#3B82F6]" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-medium text-gray-900">Export my data</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Download all your job applications as a CSV file.</p>
                        <button
                            type="button"
                            onClick={handleExport}
                            disabled={exporting}
                            className="mt-3 px-4 py-2 rounded-xl bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] disabled:opacity-60"
                        >
                            {exporting ? "Preparing…" : "Export"}
                        </button>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
                    <div className="w-10 h-10 rounded-lg bg-[#EF4444]/10 flex items-center justify-center flex-shrink-0">
                        <Trash2 size={20} className="text-[#EF4444]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900">Delete my data</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Permanently delete all your applications and profile. You will be signed out. This cannot be undone.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                value={confirmDelete}
                                onChange={(e) => setConfirmDelete(e.target.value)}
                                placeholder='Type DELETE to confirm'
                                className="px-3 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] text-sm max-w-[200px]"
                            />
                            <button
                                type="button"
                                onClick={handleDeleteData}
                                disabled={deleting || confirmDelete !== "DELETE"}
                                className="px-4 py-2 rounded-xl bg-[#EF4444] text-white text-sm font-medium hover:bg-[#DC2626] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {deleting ? "Deleting…" : "Delete all my data"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
