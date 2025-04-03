import { Suspense } from "react"
import TimelineExplorer from "@/components/timeline-explorer"
import HeroSection from "@/components/hero-section"
import { Skeleton } from "@/components/ui/skeleton"
import ThemeProvider from "@/components/theme-provider"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <HeroSection />
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mt-16 mb-2 neon-gradient-text">
            Corporate Timeline Explorer
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore and manage the rich histories of global corporations through interactive timelines
          </p>

          <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-xl" />}>
            <TimelineExplorer />
          </Suspense>
        </div>
        <Footer />
      </main>
    </ThemeProvider>
  )
}

