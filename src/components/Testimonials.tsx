const mainTestimonial = {
    quote: "Hirebase completely transformed how I approached my job search. I went from scattered spreadsheets to a clear, visual system that kept me focused and motivated. Within 6 weeks, I had 3 offers.",
    author: 'Sarah Chen',
    role: 'Senior Product Designer',
    company: 'at Figma',
    image: 'https://images.unsplash.com/photo-1745434159123-4908d0b9df94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcxNzczMTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  };

  const supportingTestimonials = [
    {
      quote: "The analytics feature helped me identify what wasn't working. I adjusted my strategy and saw results immediately.",
      author: 'Marcus Johnson',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1758599543128-8e7f12729948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBjb25maWRlbnR8ZW58MXx8fHwxNzcxODUyOTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      quote: "Simple, elegant, and effective. This is exactly what every job seeker needs but doesn't know exists.",
      author: 'Emily Rodriguez',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzE4NTI5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

export default function Testimonials() {
    return (
        <section className="bg-[#f8fafc] py-20 md:py-28 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="max-w-[900px] mx-auto">
                    <p className="text-gray-900 text-[24px] md:text-[28px] mb-8 font-normal text-base leading-relaxed">{mainTestimonial.quote}</p>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border border-[#e2e8f0]">
                                <img src={mainTestimonial.image} alt={mainTestimonial.author} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-medium text-lg">{mainTestimonial.author}</h3>
                                <div>
                                    <p className="text-gray-600 font-light text-base">{mainTestimonial.role}{' '}{mainTestimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 mt-12">
                    {supportingTestimonials.map((testimonial, index) => (
                        <div key={index} className="flex-1 bg-white rounded-2xl border border-[#e2e8f0] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <p className="text-gray-900 text-[18px] md:text-[20px] mb-8 font-normal text-base leading-relaxed">{testimonial.quote}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e2e8f0]">
                                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-medium text-lg">{testimonial.author}</h3>
                                    <div>
                                        <p className="text-gray-600 font-light text-base">{mainTestimonial.role}{' '}{mainTestimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}