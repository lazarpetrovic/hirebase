import { useNavigate } from "react-router-dom";

export default function FinalCTA() {
    const navigate = useNavigate();
    
    return (
        <section id="cta" className="bg-[#f8fafc] py-20 md:py-28 px-6 lg:px-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Take Control of Your Job Search.</h2>
                    <p className="text-lg mx-auto max-w-[600px] font-light text-gray-600 mb-8">
                        Start your free trial today and see how Hiredge can transform your job search.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => navigate('/signup')} className="px-8 py-3.5 rounded-xl bg-[#3b82f6] text-white hover:bg-[#1d4ed8] transition-colors shadow-sm hover:shadow-md text-[15px]">
                            Create Your Free Account
                        </button>
                    </div>
                    <div className="text-gray-500 font-light text-sm mt-6 flex items-center justify-center gap-2">
                        <p>No credit card required · </p>
                        <p>Free plan forever · </p>
                        <p>2-minute setup</p>
                    </div>
                </div>
            </div>
        </section>
    )
}