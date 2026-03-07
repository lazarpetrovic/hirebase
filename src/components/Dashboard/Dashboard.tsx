import { useAuth } from "../../AuthContext";
import { useApplications } from "../../ApplicationsContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Application } from "../../types/Application";
import ApplicationOverview from "./ApplicationOverview";
import AddApplicationModal from "./AddApplicationModal";
import EditApplicationModal from "./EditApplicationModal";
import AnalyticsCardsSection from "./AnalyticsCardsSection";
import type { NewApplicationData } from "../../ApplicationsContext";

const columns = [
  { id: "wishlist", title: "Wishlist", color: "border-[#9333EA]" },
  { id: "applied", title: "Applied", color: "border-[#3B82F6]" },
  { id: "interview", title: "Interview", color: "border-[#F59E0B]" },
  { id: "offer", title: "Offer", color: "border-[#22C55E]" },
  { id: "rejected", title: "Rejected", color: "border-[#EF4444]" },
];

export default function Dashboard() {
    const { user } = useAuth();
    const { applications, handleAddApplication, handleUpdateApplication } = useApplications();
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpenAddApplicationModal, setIsOpenAddApplicationModal] = useState(false);
    const [defaultStatusForModal, setDefaultStatusForModal] = useState<string>("wishlist");
    const [applicationToEdit, setApplicationToEdit] = useState<Application | null>(null);

    useEffect(() => {
        const state = location.state as { openAddModal?: boolean } | null;
        if (state?.openAddModal) {
            setIsOpenAddApplicationModal(true);
            setDefaultStatusForModal("wishlist");
            navigate("/dashboard", { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    const handleOpenAddApplicationModal = (columnId?: string) => {
        setDefaultStatusForModal(columnId ?? "wishlist");
        setIsOpenAddApplicationModal(true);
    }
    const handleCloseAddApplicationModal = () => {
        setIsOpenAddApplicationModal(false);
    }

    const handleOpenEditModal = (application: Application) => {
        setApplicationToEdit(application);
    };
    const handleCloseEditModal = () => {
        setApplicationToEdit(null);
    };

    const onUpdateApplication = async (id: string, data: NewApplicationData) => {
        try {
            await handleUpdateApplication(id, data);
            handleCloseEditModal();
        } catch (error) {
            console.error("Failed to update application:", error);
        }
    };

    const onAddApplication = async (data: NewApplicationData) => {
        try {
            await handleAddApplication(data);
            handleCloseAddApplicationModal();
        } catch (error) {
            console.error("Failed to add application:", error);
        }
    };

    return (
        <>
        <div className="space-y-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Welcome back, {user?.name}.
                </h1>
                <p className="text-gray-600">
                    Here's a quick overview of your application progress.
                </p>
                
                <div id="analytics" className="hidden md:block">
                    <AnalyticsCardsSection />
                </div>
            <ApplicationOverview applications={applications} columns={columns} handleOpenAddApplicationModal={handleOpenAddApplicationModal} onEditApplication={handleOpenEditModal}/>
        </div>
        <AddApplicationModal columns={columns} isOpen={isOpenAddApplicationModal} onClose={handleCloseAddApplicationModal} handleAddApplication={onAddApplication} defaultStatus={defaultStatusForModal}/>
        <EditApplicationModal application={applicationToEdit} columns={columns} isOpen={!!applicationToEdit} onClose={handleCloseEditModal} onUpdate={onUpdateApplication}/>
        </>
    )
}