import { useState } from "react"
import { X, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    }

    const navLinks = [
        { href: '#product', label: 'Product', id: 'product' },
        { href: '#features', label: 'Features', id: 'features' },
        { href: '#pricing', label: 'Pricing', id: 'pricing' },
        { href: '#about', label: 'About', id: 'about' },
        { href: '#contact', label: 'Contact', id: 'contact' },
    ]

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-xl font-semibold text-gray-900">Hirebase</a>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(({ href, label, id }) => (
                            <a key={id} href={href} onClick={scrollTo(id)} className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">{label}</a>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => navigate('/signin')} className="text-gray-600 hover:text-gray-900 transition-colors text-[15px]">
                            Sign In
                        </button>
                        <button onClick={() => navigate('/signup')} className="px-5 py-2 rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors shadow-sm hover:shadow-md text-[15px]">
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
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-[#E2E8F0]">
                    <div className="px-6 py-4 space-y-4">
                        {navLinks.map(({ href, label, id }) => (
                            <a key={id} href={href} onClick={scrollTo(id)} className="block text-gray-600 hover:text-gray-900 transition-colors text-[15px]">{label}</a>
                        ))}
                        <div className="pt-4 space-y-3">
                            <button onClick={() => navigate('/signin')} className="w-full px-4 py-2 rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors shadow-sm hover:shadow-md text-[15px]">Sign In</button>
                            <button onClick={() => navigate('/signup')} className="w-full px-4 py-2 rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors shadow-sm hover:shadow-md text-[15px]">Start Free</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}