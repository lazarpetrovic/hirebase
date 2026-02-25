export default function Companies() {
    return (
        <section id="about" className="bg-[#f8fafc] py-16 px-6 lg:px-8 border-y border-[#e2e8f0] overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <p className="text-center text-[13px] font-light text-gray-500 mb-8 uppercase tracking-wider">
                    trusted by professionals from leading companies
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-60">
                    <div className="text-xl font-medium text-gray-400">Google</div>
                    <div className="text-xl font-medium text-gray-400">Amazon</div>
                    <div className="text-xl font-medium text-gray-400">Apple</div>
                    <div className="text-xl font-medium text-gray-400">Microsoft</div>
                    <div className="text-xl font-medium text-gray-400">Meta</div>
                    <div className="text-xl font-medium text-gray-400">LinkedIn</div>
                </div>
            </div>
        </section>
    )
}