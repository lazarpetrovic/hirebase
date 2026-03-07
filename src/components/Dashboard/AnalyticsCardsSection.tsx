import { useApplications } from "../../ApplicationsContext";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import type { Application } from "../../types/Application";

const summaryCardConfig = [
    { title: "Total Applications", status: null as Application["status"] | null, icon: Briefcase, iconBackground: "bg-[#EFF6FF]", iconColor: "text-[#3B82F6]" },
    { title: "Interviews", status: "interview" as const, icon: Calendar, iconBackground: "bg-[#FEF3C7]", iconColor: "text-[#F59E0B]" },
    { title: "Offers", status: "offer" as const, icon: CheckCircle, iconBackground: "bg-[#D1FAE5]", iconColor: "text-[#22C55E]" },
    { title: "Rejected", status: "rejected" as const, icon: XCircle, iconBackground: "bg-[#FEE2E2]", iconColor: "text-[#EF4444]" },
];

function getApplicationDate(app: Application): number {
    const d = app.dateApplied;
    if (typeof d === "string") return new Date(d.slice(0, 10)).getTime();
    if (d && typeof d === "object" && "toDate" in d) return (d as { toDate: () => Date }).toDate().getTime();
    return 0;
}

function useWeekOverWeek(applications: Application[]) {
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;
    const thisWeekStart = now - 7 * msPerDay;
    const lastWeekStart = now - 14 * msPerDay;

    const stats: Record<string, { thisWeek: number; lastWeek: number }> = {
        total: { thisWeek: 0, lastWeek: 0 },
        interview: { thisWeek: 0, lastWeek: 0 },
        offer: { thisWeek: 0, lastWeek: 0 },
        rejected: { thisWeek: 0, lastWeek: 0 },
    };

    applications.forEach((app) => {
        const time = getApplicationDate(app);
        const isThisWeek = time >= thisWeekStart;
        const isLastWeek = time >= lastWeekStart && time < thisWeekStart;
        const status = app.status;
        if (isThisWeek) {
            stats.total.thisWeek++;
            if (stats[status]) stats[status].thisWeek++;
        }
        if (isLastWeek) {
            stats.total.lastWeek++;
            if (stats[status]) stats[status].lastWeek++;
        }
    });

    return (status: Application["status"] | null) => {
        const key = status ?? "total";
        const { thisWeek, lastWeek } = stats[key];
        let changePercent = 0;
        let changeType: "increase" | "decrease" = "increase";
        if (lastWeek > 0) {
            changePercent = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
            changeType = thisWeek >= lastWeek ? "increase" : "decrease";
        } else if (thisWeek > 0) {
            changePercent = 100;
        }
        return { changePercent, changeType };
    };
}

interface AnalyticsCardsSectionProps {
    className?: string;
}

export default function AnalyticsCardsSection({ className = "" }: AnalyticsCardsSectionProps) {
    const { applications } = useApplications();
    const getWeekOverWeek = useWeekOverWeek(applications);

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
            {summaryCardConfig.map((item) => {
                const value = item.status === null ? applications.length : applications.filter((a) => a.status === item.status).length;
                const { changePercent, changeType } = getWeekOverWeek(item.status);
                return (
                    <AnalyticsCard
                        key={item.title}
                        title={item.title}
                        value={value}
                        icon={item.icon}
                        change={changePercent}
                        changeType={changeType}
                        iconBackground={item.iconBackground}
                        iconColor={item.iconColor}
                    />
                );
            })}
        </div>
    );
}
