import { BarChart3, Calendar, Kanban } from "lucide-react";

const features = [
    {
      icon: Kanban,
      title: 'Visual Pipeline Management',
      description: 'Organize applications across stages with an intuitive drag-and-drop kanban board. See your progress at a glance.',
    },
    {
      icon: Calendar,
      title: 'Interview & Offer Tracking',
      description: 'Never miss an interview or deadline. Track key dates, follow-ups, and negotiations in one central timeline.',
    },
    {
      icon: BarChart3,
      title: 'Insightful Application Analytics',
      description: 'Understand your job search performance with clear metrics. Optimize your strategy with data-driven insights.',
    },
  ];

export default function Features() {
    return (
        <section className="bg-white py-20 md:py-28 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                        Designed for clarity and momentum.
                    </h2>
                    <p className="text-lg mx-auto max-w-[600px] font-light text-gray-600">
                    Everything you need to run a professional, organized job search—without the overwhelm.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                    {features.map((feature, index) => (
                        <div key="index" className="group bg-white p-8 rounded-2xl border border-[#e2e8f0] hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300">
                            <div className="mb-8 w-12 h-12 flex items-center justify-center rounded-xl bg-[#f0f9ff] group-hover:bg-[#3B82F6]/20 transition-colors duration-300">
                                <feature.icon size={24} className="text-[#3B82F6]" />
                            </div>
                            <h3 className="mb-4 font-medium text-gray-900 text-xl">{feature.title}</h3>
                            <p className="text-gray-600 font-light text-base leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}