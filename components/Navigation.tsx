'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Navigation() {
  const handleScrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      console.log('Element found:', element);
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      
      console.log('Scrolling to position:', elementPosition);
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      console.log('Element not found for section:', sectionId);
    }
  };

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center group" aria-label="Attacked.AI Home">
          <Image
            src="https://attacked.ai/_next/image?url=%2Fimages%2Flogo_with_name_dark.png&w=384&q=75"
            alt="Attacked.AI"
            width={160}
            height={32}
            priority
            className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
          />
        </Link>
        
        {/* Enhanced navigation with premium styling */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => handleScrollToSection('latest')}
            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-xs sm:text-sm md:text-base text-white font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl cursor-pointer active:scale-95"
            type="button"
          >
            Latest
          </button>
          <button 
            onClick={() => handleScrollToSection('map')}
            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-xs sm:text-sm md:text-base text-white font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl cursor-pointer active:scale-95"
            type="button"
          >
            Map
          </button>
          <button 
            onClick={() => handleScrollToSection('stories')}
            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-xs sm:text-sm md:text-base text-white font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl cursor-pointer active:scale-95"
            type="button"
          >
            Stories
          </button>
        </nav>
      </div>
    </header>
  )
} 