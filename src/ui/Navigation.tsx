import { useState } from "react"
import { X, Menu } from "lucide-react"

export default function Navigation() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center justify-between py-4">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-xl font-semibold text-gray-900">Hirebase</a>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">Product</a>
                        <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">Features</a>
                        <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">Pricing</a>
                        <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">About</a>
                        <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">Contact</a>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">
                            Sign In
                        </button>
                        <button className="px-5 py-2 rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors shadow-sm hover:shadow-md text-[15px]">
                            Start Free
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}