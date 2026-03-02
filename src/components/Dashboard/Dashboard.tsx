import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../AuthContext";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import { useEffect, useState } from "react";
import type { Application } from "../../types/Application";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import ApplicationOverview from "./ApplicationOverview";
import AddApplicationModal from "./AddApplicationModal";

const columns = [
  { id: "wishlist", title: "Wishlist", color: "border-[#9333EA]" },
  { id: "applied", title: "Applied", color: "border-[#3B82F6]" },
  { id: "interview", title: "Interview", color: "border-[#F59E0B]" },
  { id: "offer", title: "Offer", color: "border-[#22C55E]" },
  { id: "rejected", title: "Rejected", color: "border-[#EF4444]" },
];

const summaryData = [
    {
      title: "Total Applications",
      value: 100,
      icon: Briefcase,
      change: 12.5,
      changeType: "increase" as const,
      iconBackground: "bg-[#EFF6FF]",
      iconColor: "text-[#3B82F6]",
    },
    {
      title: "Interviews",
      value: 10,
      icon: Calendar,
      change: 8.2,
      changeType: "increase" as const,
      iconBackground: "bg-[#FEF3C7]",
      iconColor: "text-[#F59E0B]",
    },
    {
      title: "Offers",
      value: 5,
      icon: CheckCircle,
      change: 25.0,
      changeType: "increase" as const,
      iconBackground: "bg-[#D1FAE5]",
      iconColor: "text-[#22C55E]",
    },
    {
      title: "Rejected",
      value: 2,
      icon: XCircle,
      change: 3.1,
      changeType: "decrease" as const,
      iconBackground: "bg-[#FEE2E2]",
      iconColor: "text-[#EF4444]",
    },
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
    const [applications, setApplications] = useState<Application[]>([]);
    const [isOpenAddApplicationModal, setIsOpenAddApplicationModal] = useState(false);

    const handleOpenAddApplicationModal = () => {
        setIsOpenAddApplicationModal(true);
    }
    const handleCloseAddApplicationModal = () => {
        setIsOpenAddApplicationModal(false);
    }

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
        <div className="min-h-screen bg-[#f8fafc]">
        <div className="hidden md:block">
            <Sidebar />
        </div>
        <Topbar handleOpenAddApplicationModal={handleOpenAddApplicationModal} />
        <main className="mt-16 md:ml-70 max-w-[1400px] mx-auto p-6 md:p-8 space-y-8">
            <div className="space-y-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Welcome back, {user?.name}.
                </h1>
                <p className="text-gray-600">
                    Here's a quick overview of your application progress.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryData.map((item) => (
                    <AnalyticsCard key={item.title} {...item}/>
                ))}
                </div>
            </div>
            <ApplicationOverview applications={applications} columns={columns} handleOpenAddApplicationModal={handleOpenAddApplicationModal}/>
        </main>
        <AddApplicationModal columns={columns} isOpen={isOpenAddApplicationModal} onClose={handleCloseAddApplicationModal} handleAddApplication={handleAddApplication}/>
        </div>
    )
}