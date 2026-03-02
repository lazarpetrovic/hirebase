import { Calendar, MapPin, MoreVertical } from "lucide-react";
import type { Application } from "../../types/Application";

interface JobAppCardProps {
    application: Application;
}

const statusColors = {
    wishlist: { bg: "bg-[#F3E8FF]", text: "text-[#9333EA]", label: "Wishlist" },
    applied: { bg: "bg-[#DBEAFE]", text: "text-[#3B82F6]", label: "Applied" },
    interview: { bg: "bg-[#FEF3C7]", text: "text-[#F59E0B]", label: "Interview" },
    offer: { bg: "bg-[#D1FAE5]", text: "text-[#22C55E]", label: "Offer" },
    rejected: { bg: "bg-[#FEE2E2]", text: "text-[#EF4444]", label: "Rejected" },
  };

export default function JobAppCard({ application }: JobAppCardProps) {
    const statusConfig = statusColors[application.status];

    // Generate a color based on company name for logo placeholder
    const getLogoColor = (name: string) => {
        const colors = [
        "bg-[#3B82F6]",
        "bg-[#8B5CF6]",
        "bg-[#22C55E]",
        "bg-[#F59E0B]",
        "bg-[#EF4444]",
        "bg-[#06B6D4]",
        ];
        const index = name.length % colors.length;
        return colors[index];
    };

    return (
        <div className='group bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow duration-300'>
            <div className='flex items-start justify-between mb-3'>
                <div className={`w-10 h-10 ${getLogoColor(application.company)} flex items-center justify-center rounded-lg text-white font-semibold`}>
                    {application.company.charAt(0).toUpperCase()}
                </div>
                <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-[#f8fafc] rounded-lg transition-all">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div className="mb-2 space-y-1  ">
                <h3 className="text-gray-900 font-medium text-md">{application.position}</h3>
                <p className="text-gray-600 font-medium text-sm">{application.company}</p>
                <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span className="px-2 py-0.5 text-gray-600 font-light text-xs">{application.location}</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className={`${statusConfig.bg} rounded-full px-2.5 py-0.5`}>
                    <span className={`${statusConfig.text} text-xs font-medium`}>{statusConfig.label}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-600 text-xs">{application.dateApplied}</span>
                </div>
            </div>
        </div>
    )
}