import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";

export default function Home() {
  return (
    <main className="flex-1 min-h-screen flex flex-col">
      <HeroSection />
      <GallerySection />
    </main>
  );
}
