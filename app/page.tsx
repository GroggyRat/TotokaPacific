import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Voyage } from "@/components/Voyage";
import { Process } from "@/components/Process";
import { Numbers } from "@/components/Numbers";
import { Founder } from "@/components/Founder";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { InvertBlock } from "@/components/InvertBlock";
import { MasiLine } from "@/components/MasiLine";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Voyage />
        <Process />
        <InvertBlock>
          <Numbers />
          <Founder />
        </InvertBlock>
        <div className="px-5 pt-20 text-accent/60 sm:px-10">
          <MasiLine />
        </div>
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
