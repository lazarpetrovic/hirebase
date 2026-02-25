const stats = [
    {
      value: '40%',
      label: 'More Interview Invites',
      description: 'Users report increased interview rates',
    },
    {
      value: '2×',
      label: 'Faster Tracking',
      description: 'Spend less time organizing, more applying',
    },
    {
      value: '5,000+',
      label: 'Active Users',
      description: 'Job seekers trust Hirebase daily',
    },
    {
      value: '98%',
      label: 'Satisfaction Rate',
      description: 'Users would recommend to a friend',
    },
  ];

export default function Statistics() {
    return (
        <section id="statistics" className="bg-white py-20 md:py-28 px-6 lg:px-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-18">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Turn effort into measurable progress.</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 space-y-3">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center border border-[#e2e8f0] rounded-2xl px-10 py-8 bg-white hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300">
                            <div className="text-4xl md:text-5xl font-bold text-[#3B82F6] mb-4">{stat.value}</div>
                            <div className="text-lg font-medium text-gray-900 mb-1">{stat.label}</div>
                            <div className="text-sm font-light text-gray-600 max-w-[200px] mx-auto">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}