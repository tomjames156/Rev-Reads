import Image from 'next/image';
import { bodoni } from '../fonts';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brand-brown to-brand-brown-dark text-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Logo and sitename row */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative w-10 h-10">
            <Image
              src="/images/logo.jpeg"
              alt="RevReads Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <span className={`text-2xl font-bold text-black ${bodoni.className}`}>RevReads</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-2xl font-medium mb-4 text-black ${bodoni.className}`}>RevReads</h3>
            <p className="text-black font-normal">
              Your destination for authentic book reviews and literary discussions.
            </p>
          </div>
          <div>
            <h4 className={`text-xl font-medium mb-4 text-black ${bodoni.className}`}>Quick Links</h4>
            <ul className="space-y-[0.25rem]">
              <li>
                <a href="/about" className="text-black hover:text-brand-green transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-black hover:text-brand-green transition-colors">Contact</a>
              </li>
              <li>
                <a href="/privacy" className="text-black hover:text-brand-green transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={`text-xl font-medium mb-4 text-black ${bodoni.className}`}>Connect With Us</h4>
            <ul className="space-y-[0.25rem]">
              <li>
                <a href="#" className="text-black hover:text-brand-green transition-colors">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-brand-green transition-colors">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-brand-green transition-colors">Facebook</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-black text-sm">
          <p>© {new Date().getFullYear()} RevReads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
