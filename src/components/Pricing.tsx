import { CheckCircle } from "lucide-react";

const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with job tracking',
      popular: false,
      features: [
        'Up to 25 active applications',
        'Basic kanban board',
        'Interview scheduling',
        'Email reminders',
        'Mobile app access',
      ],
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For serious job seekers who want every advantage',
      popular: true,
      features: [
        'Unlimited applications',
        'Advanced analytics & insights',
        'Custom pipeline stages',
        'Priority support',
        'Weekly progress reports',
        'Resume version tracking',
        'Company research notes',
        'Export to PDF/CSV',
      ],
    },
  ];

export default function Pricing() {
    return (
        <section id="pricing" className="bg-white py-20 md:py-28 px-6 lg:px-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                        Simple pricing. No complexity.
                    </h2>
                    <p className="text-lg mx-auto max-w-[600px] font-light text-gray-600">
                        Start free, upgrade when you need more power. No hidden fees, cancel anytime.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 max-w-[960px] mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index} className={`flex-1 bg-white rounded-2xl border-2 p-8 transition-all relative 
                        ${plan.popular ? 'border-[#3B82F6]' : 'border-[#e2e8f0]'}`}>
                            {plan.popular && (<div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="bg-[#3B82F6] text-white text-center leading-10 px-4 py-2 rounded-2xl">
                                    Most Popular
                                </span>
                            </div>)}

                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold text-gray-900 mb-4">{plan.price}{' '}<span className="text-gray-500 text-base font-light">{plan.period}</span></span>
                            </div>
                            <p className="text-gray-600 font-light text-base leading-relaxed mb-8">{plan.description}</p>
                            <div className="mb-8">
                                <button className={`w-full px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:scale-102 hover:shadow-xl text-[15px] ${plan.popular ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' : 'bg-white border border-[#e2e8f0] text-gray-700 hover:bg-[#f8fafc]'}`}>
                                    {plan.popular ? 'Get Started' : 'Start Pro Trial'}
                                </button>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-[#3B82F6]" />
                                        <span className="text-gray-600 font-light text-base leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}