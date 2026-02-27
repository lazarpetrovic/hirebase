import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    change: number;
    changeType: 'increase' | 'decrease';
    iconColor: string;
    iconBackground: string;
}

export default function AnalyticsCard({ title, value, icon: Icon, change, changeType, iconColor, iconBackground }: SummaryCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-xl border border-[#e2e8f0] p-6 hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col items-start justify-center">
                    <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
                    <span className="text-3xl font-semibold text-gray-900 mb-2">{value}</span>
                    <div className="flex items-center gap-1">
                        {changeType === 'increase' ? (<TrendingUp className="w-4 h-4 text-[#22c55e]" />) 
                        : (<TrendingDown className="w-4 h-4 text-[#ef4444]" />)}
                        <span className={`text-sm font-medium ${changeType === 'increase' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{change}%</span>
                        <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                </div>
                <div className={`w-12 h-12 ${iconBackground} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-[${iconColor}]`} />
                </div>
            </div>
        </div>
    )
}