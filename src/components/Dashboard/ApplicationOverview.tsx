import type { Application } from "../../types/Application";

interface ApplicationOverviewProps {
    applications: Application[]
}

export default function ApplicationOverview({ applications }: ApplicationOverviewProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0]">

        </div>
    )
}