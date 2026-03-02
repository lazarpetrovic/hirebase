import { useAuth } from "../../AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import { useEffect, useState } from "react";
import type { Application } from "../../types/Application";
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import ApplicationOverview from "./ApplicationOverview";
import AddApplicationModal from "./AddApplicationModal";
import EditApplicationModal from "./EditApplicationModal";

const columns = [
  { id: "wishlist", title: "Wishlist", color: "border-[#9333EA]" },
  { id: "applied", title: "Applied", color: "border-[#3B82F6]" },
  { id: "interview", title: "Interview", color: "border-[#F59E0B]" },
  { id: "offer", title: "Offer", color: "border-[#22C55E]" },
  { id: "rejected", title: "Rejected", color: "border-[#EF4444]" },
];

const summaryCardConfig = [
    { title: "Total Applications", status: null as Application["status"] | null, icon: Briefcase, iconBackground: "bg-[#EFF6FF]", iconColor: "text-[#3B82F6]" },
    { title: "Interviews", status: "interview" as const, icon: Calendar, iconBackground: "bg-[#FEF3C7]", iconColor: "text-[#F59E0B]" },
    { title: "Offers", status: "offer" as const, icon: CheckCircle, iconBackground: "bg-[#D1FAE5]", iconColor: "text-[#22C55E]" },
    { title: "Rejected", status: "rejected" as const, icon: XCircle, iconBackground: "bg-[#FEE2E2]", iconColor: "text-[#EF4444]" },
];

type NewApplicationData = {
  company: string;
  position: string;
  location: string;
  dateApplied: string;
  status: string;
}

export default function Dashboard() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
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

    const handleUpdateApplication = async (id: string, data: NewApplicationData) => {
        if (!user) return;
        try {
            await updateDoc(doc(db, "jobApplications", id), {
                company: data.company,
                position: data.position,
                location: data.location,
                dateApplied: data.dateApplied,
                status: data.status,
            });
            setApplications((prev) =>
                prev.map((app) =>
                    app.id === id
                        ? { ...app, ...data, status: data.status as Application["status"] }
                        : app
                )
            );
            handleCloseEditModal();
        } catch (error) {
            console.error("Failed to update application:", error);
        }
    };

    const handleAddApplication = async (data: NewApplicationData) => {
      if (!user) return;
      try {
        const docRef = await addDoc(collection(db, "jobApplications"), {
          userId: user.uid,
          ...data,
        });
        const newApp: Application = {
          id: docRef.id,
          userId: user.uid,
          company: data.company,
          position: data.position,
          location: data.location,
          dateApplied: data.dateApplied,
          status: data.status as "wishlist" | "applied" | "interview" | "offer" | "rejected",
        };
        setApplications((prev) => [newApp, ...prev]);
        handleCloseAddApplicationModal();
      } catch (error) {
        console.error("Failed to add application:", error);
      }
    }

    useEffect(() => {
        if (!user) return;
      
        const fetchApplications = async () => {
          const applicationsRef = collection(db, "jobApplications");

          const q = query(
            applicationsRef,
            where("userId", "==", user.uid),
            orderBy("dateApplied", "desc")
          );
      
          const snapshot = await getDocs(q);

          const applications = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Application[];
      
          setApplications(applications);
        };
      
        fetchApplications();
      
      }, [user]);

    return (
        <>
        <div className="space-y-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Welcome back, {user?.name}.
                </h1>
                <p className="text-gray-600">
                    Here's a quick overview of your application progress.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCardConfig.map((item) => {
                    const value = item.status === null ? applications.length : applications.filter((a) => a.status === item.status).length;
                    return (
                        <AnalyticsCard
                            key={item.title}
                            title={item.title}
                            value={value}
                            icon={item.icon}
                            change={0}
                            changeType="increase"
                            iconBackground={item.iconBackground}
                            iconColor={item.iconColor}
                        />
                    );
                })}
                </div>
            <ApplicationOverview applications={applications} columns={columns} handleOpenAddApplicationModal={handleOpenAddApplicationModal} onEditApplication={handleOpenEditModal}/>
        </div>
        <AddApplicationModal columns={columns} isOpen={isOpenAddApplicationModal} onClose={handleCloseAddApplicationModal} handleAddApplication={handleAddApplication} defaultStatus={defaultStatusForModal}/>
        <EditApplicationModal application={applicationToEdit} columns={columns} isOpen={!!applicationToEdit} onClose={handleCloseEditModal} onUpdate={handleUpdateApplication}/>
        </>
    )
}