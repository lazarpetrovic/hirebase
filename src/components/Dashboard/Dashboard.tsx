import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../AuthContext";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";

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

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#f8fafc]">
        <div className="hidden md:block">
            <Sidebar />
        </div>
        <Topbar />
        <main className="pt-16 md:ml-50">
            <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Welcombe back, {user?.name}.
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
        </main>
        </div>
    )
}