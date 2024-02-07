import Header from "./Header";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-auto">
      <Header />
      <Hero />
      <AboutUs />
      <Footer />
    </div>
  );
}
