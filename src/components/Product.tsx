import { CheckIcon } from "lucide-react";

const showcases = [
    {
      title: 'Visualize your entire pipeline',
      description: 'Move applications through stages effortlessly. From initial research to offer negotiation, see exactly where each opportunity stands.',
      highlights: [
        'Drag-and-drop interface for quick updates',
        'Custom stages tailored to your workflow',
        'Color-coded priorities and status indicators',
      ],
      image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW5iYW4lMjBib2FyZCUyMHByb2plY3QlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc3MTg1MjkwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      imageAlt: 'Kanban board interface',
      reverse: false,
    },
    {
      title: 'Turn data into decisions',
      description: 'Understand your job search patterns with powerful analytics. Track response rates, identify bottlenecks, and refine your approach.',
      highlights: [
        'Real-time performance metrics and trends',
        'Application-to-interview conversion insights',
        'Weekly progress reports delivered to your inbox',
      ],
      image: 'https://images.unsplash.com/photo-1736751035793-353baaa416cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBjaGFydHMlMjBncmFwaHN8ZW58MXx8fHwxNzcxODUyOTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      imageAlt: 'Analytics dashboard',
      reverse: true,
    },
  ];

export default function Product() {
    return (
        <section className="bg-[#f8fafc] py-20 md:py-28 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-24 md:space-y-32">
                {showcases.map((showcase, index) => (
                    <div key={index} className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${showcase.reverse ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`${showcase.reverse ? 'lg:order-2' : ''}`}>
                            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">{showcase.title}</h3>
                            <p className="text-gray-600 font-light text-base leading-relaxed mb-6">{showcase.description}</p>
                            <ul>
                                {showcase.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#22c55e]/20 rounded-full">
                                            <CheckIcon size={14} className="text-[#22c55e] mt-0.5" />
                                        </div>
                                        <span className="text-base font-light text-gray-700">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${showcase.reverse ? 'lg:order-1' : ''}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#e2e8f0]" >
                                <img src={showcase.image} alt={showcase.imageAlt} className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}