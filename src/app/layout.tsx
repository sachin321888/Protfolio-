import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SACHIN RAMESH | Visual Storyteller",
  description: "Professional Photography & Videography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-teal text-white" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col font-sans`} suppressHydrationWarning>
        
        {/* Editorial Navigation */}
        <header className="absolute top-0 left-0 w-full z-40 bg-transparent">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
            <a href="/" className="font-sans font-medium text-lg tracking-widest flex items-center gap-1 group">
              <span className="text-orange group-hover:text-white transition-colors">SACHIN</span>
              <span className="text-white group-hover:text-orange transition-colors">RAMESH</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-10">
              <a href="#about" className="text-sm tracking-wide text-white/70 hover:text-white transition-colors">About</a>
              <a href="#portfolio" className="text-sm tracking-wide text-white/70 hover:text-white transition-colors">Gallery</a>
              <a href="#" className="text-sm tracking-wide text-white/70 hover:text-white transition-colors">Exhibitions</a>
              <a href="#" className="text-sm tracking-wide text-white/70 hover:text-white transition-colors">Contact</a>
            </nav>
            
            {/* Mobile menu placeholder */}
            <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
              <span className="w-6 h-[1px] bg-white"></span>
              <span className="w-6 h-[1px] bg-white"></span>
              <span className="w-4 h-[1px] bg-white"></span>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
