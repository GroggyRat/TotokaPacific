import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Routes } from "@/components/Routes";
import { Process } from "@/components/Process";
import { Founder } from "@/components/Founder";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Routes />
        <Process />
        <Founder />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
