import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Hero() {
    const navigate = useNavigate();

    const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id="hero" className="bg-white py-16 md:py-24 lg:py-32 px-6 lg:px-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-tight mb-6">
                            Bring Structure to Your Job Search.
                        </h1>
                        <p className="text-[18px] md:text-[20px] font-normal text-gray-600 leading-relaxed mb-8 w-full md:max-w-[560px] mx-auto lg:mx-0">
                            Track applications, interviews, and offers in one intelligent workspace.
                            Transform your job search from chaos to clarity.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <button onClick={() => navigate('/signup')} className="px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors shadow-sm hover:shadow-md text-[15px]">
                                Start Free
                            </button>
                            <a
                                type="button"
                                href="#product"
                                onClick={scrollTo('product')}
                                className="group gap-2 px-8 py-3.5 bg-white text-gray-700 border border-[#e2e8f0] rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300 font-normal text-base inline-flex items-center justify-center"
                            >
                                View Product <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300"/>
                            </a>
                        </div>
                        <p className="text-gray-500 font-light text-sm mt-6">
                            Used by <span className="font-medium text-gray-700">5,000+ job seekers</span> worldwide
                        </p>
                    </div>
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e2e8f0]">
                            <img
                            src="https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxNzkxMjM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt="Hero Image"
                            className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-[#3b82f6]/20 to-[#22c55e]/20 rounded-2xl -z-10"/>
                    </div>
                </div>
            </div>
        </section>
    )
}