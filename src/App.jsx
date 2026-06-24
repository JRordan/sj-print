import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Services from './components/Services.jsx';
import Benefits from './components/Benefits.jsx';
import Pricing from './components/Pricing.jsx';
import Portfolio from './components/Portfolio.jsx';
// import Testimonials from './components/Testimonials.jsx';
import OrderForm from './components/OrderForm.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import useFadeUp from './hooks/useFadeUp.js';

export default function App() {
  useFadeUp();

  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Services />
      <Benefits />
      <Pricing />
      <Portfolio />
      {/* <Testimonials /> */}
      <OrderForm />
      <CTA />
      <Footer />
    </>
  );
}
