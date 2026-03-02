import { PlusIcon } from "lucide-react";
import type { Application } from "../../types/Application";
import JobAppCard from "./JobAppCard";

interface ApplicationOverviewProps {
    applications: Application[];
    columns: { id: string; title: string; color: string }[];
    handleOpenAddApplicationModal: (columnId?: string) => void;
    onEditApplication: (application: Application) => void;
}

export default function ApplicationOverview({ applications, columns, handleOpenAddApplicationModal, onEditApplication }: ApplicationOverviewProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0]">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Application Pipeline</h2>
                <p className="text-gray-600 font-light text-md">Track your job application through each stage</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {columns.map((column) => {
                    const columnApplications = applications.filter((application) => application.status === column.id);
                    return (
                        <div key={column.id} className={'flex flex-col'}>
                            <div className="mb-4">
                                <div className='flex items-center justify-between mb-3'>
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        {column.title}
                                        <span className="px-2 py-0.5 bg-[#f8fafc] text-gray-600 rounded-full text-xs">
                                            {columnApplications.length}
                                        </span>
                                    </h3>
                                </div>
                                <div className={`h-1 ${column.color} border-t-2 rounded-full`}/>
                            </div>

                            <div className="space-y-3 flex-1">
                                {columnApplications.map((application) => (
                                    <JobAppCard key={application.id} application={application} onEdit={onEditApplication} />
                                ))}
                                {columnApplications.length === 0 && (
                                    <div className="bg-[#f8fafc] border-2 border-dashed border-[#e2e8f0] rounded-xl p-4 text-center">
                                        <span className="text-gray-500 text-sm">No applications</span>
                                    </div>
                                )}
                                <button onClick={() => handleOpenAddApplicationModal(column.id)} className="w-full py-3 flex items-center justify-center gap-2 hover:bg-[#f8fafc] border-2 border-dashed border-[#e2e8f0] hover:border-[#3B82F6] transition-all duration-300 rounded-xl text-center text-gray-400 hover:text-[#3B82F6]">
                                    <PlusIcon className="w-4 h-4" />
                                    <span className="text-sm font-medium">Add</span>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}