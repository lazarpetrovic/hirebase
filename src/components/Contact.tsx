import { useState, useRef } from 'react'

export default function Contact() {
    const [toast, setToast] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setToast(true)
        formRef.current?.reset()
        setTimeout(() => setToast(false), 3000)
    }

    return (
        <section className="bg-white py-20 md:py-28 px-6 lg:px-8">
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium shadow-lg">
                    Message sent successfully.
                </div>
            )}
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="How can we help?"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow resize-y min-h-[100px]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 px-6 rounded-lg bg-gray-900 text-white font-medium hover:scale-103 hover:shadow-xl transition-all duration-300"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Get in touch</h2>
                        <p className="text-lg mx-auto max-w-[600px] font-light text-gray-600">
                            We're here to help you get the most out of Hirebase.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}