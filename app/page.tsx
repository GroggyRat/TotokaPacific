import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { about } from "@/content/site";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main">
        <Hero />
        {/* Step 2 starts here. Temporary end-of-hero stand-in so the dissolve has somewhere to land. */}
        <section id="about" className="relative flex min-h-[100svh] items-center bg-ink-2 px-5 sm:px-10">
          <p className="label text-mist">
            {about.num} — {about.label} · next section, built in step 2
          </p>
        </section>
      </main>
    </>
  );
}
