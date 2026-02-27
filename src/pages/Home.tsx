import Hero from "../components/Hero";
import Navigation from "../ui/Navigation";
import Companies from "../components/Companies";
import Features from "../components/Features";
import Product from "../components/Product";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Faq from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Contact from "../components/Contact";
import Footer from "../ui/Footer";

export default function Home() {
    return (
        <>
        <Navigation />
        <Hero />
        <Companies />
        <Features />
        <Product />
        <Statistics />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCTA />
        <Contact />
        <Footer />
        </>
    )
}