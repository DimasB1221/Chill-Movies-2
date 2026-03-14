import Nav from "@/src/components/global/nav";
import Footer from "@/src/components/global/footer";
import { HeroSection } from "@/src/components/homepage/hero-section";
import { MovieSection } from "@/src/components/homepage/movie-section";

export default function Home() {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main className="min-h-screen  bg-primary overflow-x-hidden">
        <HeroSection />

        <div className="space-y-8 md:space-y-12 pb-8 mt-10">
          <MovieSection title="Film Terbaru" />

          <MovieSection title="Rekomendasi Untukmu" reverse />
        </div>
      </main>

      <footer className="bg-primary">
        <Footer />
      </footer>
    </>
  );
}
