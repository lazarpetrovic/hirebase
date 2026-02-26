import Navigation from "./ui/Navigation"
import Hero from "./components/Hero"
import Companies from "./components/Companies"
import Features from "./components/Features"
import Product from "./components/Product"
import Statistics from "./components/Statistics"
import Testimonials from "./components/Testimonials"
import Pricing from "./components/Pricing"
import Faq from "./components/FAQ"
import FinalCTA from "./components/FinalCTA"
import Contact from "./components/Contact"
import Footer from "./ui/Footer"
import { Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


export default function App() { 
  return (
    <Routes>
      <Route path="/" element={<>
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
      </>} />
      <Route path="/signin" element={<><SignIn /></>} />
      <Route path="/signup" element={<><SignUp /></>} />
    </Routes>
  )
}

