import About from "./_components/About";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Listings from "./_components/Listings";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Listings />
      <About />
      <Footer />
    </div>
  );
}
