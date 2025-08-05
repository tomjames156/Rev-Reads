import Link from 'next/link';
import Image from 'next/image';
import { bodoni } from '../fonts';
import { useState } from 'react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`bg-white border-b border-x border-brand-brown/10 shadow-[0_4px_6px_-1px_rgba(139,69,19,0.1)] sticky top-0 z-50 ${menuOpen ? '' : 'rounded-b-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.jpeg"
                  alt="RevReads Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className={`text-2xl font-bold text-brand-brown ${bodoni.className}`}>RevReads</span>
            </Link>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center px-2 py-1 text-brand-brown focus:outline-none"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-3 py-2 text-brand-brown font-medium border-b-2 border-transparent hover:border-brand-brown hover:text-brand-brown-dark transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/your-reviews" 
              className="inline-flex items-center px-3 py-2 text-brand-brown font-medium border-b-2 border-transparent hover:border-brand-green hover:text-brand-green-dark transition-colors"
            >
              Your Reviews
            </Link>
            <Link 
              href="/login" 
              className="inline-flex items-center px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors font-medium shadow-sm hover:shadow"
            >
              Login
            </Link>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-40 flex flex-col gap-2 p-4 animate-fade-in shadow-lg border-b border-x border-brand-brown/10 rounded-b-lg">
            <Link 
              href="/" 
              className="inline-flex items-center px-3 py-2 text-brand-brown font-medium border-b-2 border-transparent hover:border-brand-brown hover:text-brand-brown-dark transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/your-reviews" 
              className="inline-flex items-center px-3 py-2 text-brand-brown font-medium border-b-2 border-transparent hover:border-brand-green hover:text-brand-green-dark transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Your Reviews
            </Link>
            <Link 
              href="/login" 
              className="inline-flex items-center px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors font-medium shadow-sm hover:shadow"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
