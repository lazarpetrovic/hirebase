import { ChevronDown } from "lucide-react";
import { useState } from "react";

  const faqs = [
    {
      question: 'How is Hiredge different from a spreadsheet?',
      answer: 'Hiredge is purpose-built for job searching. Unlike spreadsheets, it offers visual pipeline management, automated reminders, analytics, and a mobile-friendly interface designed specifically for tracking applications.',
    },
    {
      question: 'Can I import my existing application data?',
      answer: 'Yes! You can easily import your data from CSV files or spreadsheets. Our import tool maps your columns automatically, and our support team is happy to help with larger imports.',
    },
    {
      question: 'Is my data private and secure?',
      answer: 'Absolutely. All data is encrypted in transit and at rest. We never share your information with third parties, and you can export or delete your data at any time.',
    },
    {
      question: 'What happens when I reach the free plan limit?',
      answer: "You'll receive a notification when approaching the 25-application limit. You can archive older applications to stay within the limit or upgrade to Pro for unlimited applications.",
    },
    {
      question: 'Can I cancel my Pro subscription anytime?',
      answer: 'Yes, you can cancel anytime with no penalties. Your Pro features will remain active until the end of your billing period, then your account will automatically switch to the Free plan.',
    },
    {
      question: 'Do you offer student or nonprofit discounts?',
      answer: 'Yes! We offer 50% off Pro plans for students and nonprofit employees. Contact our support team with proof of eligibility to receive your discount code.',
    },
  ];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    
    return (
        <section id="faq" className="bg-[#f8fafc] py-20 md:py-28 px-6 lg:px-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-lg mx-auto max-w-[600px] font-light text-gray-600">
                        Everything you need to know about our product and how it works.
                    </p>
                </div>
                <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                            <button onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-gray-50 transition-colors">
                                <span className="text-gray-900 font-medium text-base">{faq.question}</span>
                                <ChevronDown size={20} className={`text-gray-500 transition-transform flex-shirnk-0 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            {openIndex === index && (
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="px-6 pb-5 text-base text-gray-600 leading-relaxed font-light">
                                    {faq.answer}
                                </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}