export default function Footer() {
    return (
        <footer className="bg-white py-10 md:py-16 px-6 lg:px-8 border-t border-[#e2e8f0] overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
                    <div>
                        <h3 className="text-gray-900 font-medium text-xl mb-3">Hirebase</h3>
                        <p className="text-gray-600 font-light text-sm">
                        The professional job application tracker. Bring structure, clarity, and momentum to your job search.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                        Product
                        </h4>
                        <ul className="space-y-2.5">
                        <li>
                            <a href="#features" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Features
                            </a>
                        </li>
                        <li>
                            <a href="#pricing" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Roadmap
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Changelog
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                        Company
                        </h4>
                        <ul className="space-y-2.5">
                        <li>
                            <a href="#about" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Blog
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Careers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Contact
                            </a>
                        </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-[14px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                        Legal
                        </h4>
                        <ul className="space-y-2.5">
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Privacy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Terms
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                            Security
                            </a>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 border-t border-[#e2e8f0] pt-6">
                    <p className="text-gray-500 font-light text-sm text-center pt-4">© {new Date().getFullYear()} Hirebase. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}