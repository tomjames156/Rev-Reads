'use client';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BookRow from './components/BookRow';
import { books, Book } from './data/sampleData';
import { bodoni, geist, geistMono } from './fonts';
import TypingText from './components/TypingText';

export default function Home() {
  // Get full catalogue sorted by ID
  const fullCatalogue = [...books].sort((a, b) => 
    parseInt(a.id) - parseInt(b.id)
  );

  // Define our main genres
  const mainGenres = {
    Romance: (book: Book) => book.genres.some(g => g.includes('Romance')),
    Fiction: (book: Book) => book.genres.some(g => g.includes('Fiction')),
    Fantasy: (book: Book) => book.genres.some(g => g.includes('Fantasy'))
  };

  // Create genre-based book collections
  const booksByGenre = Object.entries(mainGenres).reduce((acc, [genre, filterFn]) => {
    acc[genre] = books.filter(filterFn);
    return acc;
  }, {} as Record<string, typeof books>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className={`relative overflow-hidden py-20 ${bodoni.className} border-b border-brand-brown/10`}>
          {/* Decorative gradient background */}
          <div className="absolute inset-0 w-full h-full bg-green-100 pointer-events-none z-0" />
          {/* Decorative shapes */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-green/40 rounded-full blur-3xl z-0" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-brand-brown/30 rounded-full blur-3xl z-0" />
          <div className="absolute top-1/3 left-0 w-48 h-48 bg-brand-green/35 rounded-full blur-2xl z-0" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-brand-brown/25 rounded-full blur-xl z-0" />
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-6 text-brand-brown">Welcome to RevReads</h1>
                <TypingText 
                  text={"Discover, Review, and Share Your Literary Journey"} 
                  className={`text-lg text-brand-brown-dark ${geistMono.className}`} 
                />
                <p className="text-lg mt-4 text-brand-brown/80">
                  Join our community of book lovers and share your thoughts on your favorite reads.
                </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="/login"
                  className="inline-flex items-center px-8 py-3 border-2 border-black text-black rounded-full bg-white hover:bg-gray-100 transition-colors font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-lg"
                  style={{ letterSpacing: '0.02em' }}
                >
                  <span className={geist.className}>Get Started</span>
                </a>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BookRow title="Full Catalogue" books={fullCatalogue} />
          
          {/* Display only our three main genres in a specific order */}
          {['Romance', 'Fiction', 'Fantasy'].map(genre => (
            booksByGenre[genre] && booksByGenre[genre].length > 0 ? (
              <BookRow 
                key={genre} 
                title={genre} 
                books={booksByGenre[genre]} 
              />
            ) : null
          ))}
        </section>

        {/* About Section */}
        <section className="bg-green-100 py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 -translate-x-16 -translate-y-16 bg-brand-green/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 translate-x-16 translate-y-16 bg-brand-brown/10 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className={`text-3xl font-bold mb-6 text-brand-brown ${bodoni.className}`}>About RevReads</h2>
              <p className="text-md text-black/80 mb-8">
                RevReads is your premier destination for authentic book reviews and literary discussions. 
                We believe in the power of shared reading experiences and the joy of discovering your next 
                favorite book through the eyes of fellow readers.
              </p>
              <p className={`text-xl font-md italic text-brand-green ${bodoni.className}`}>
                &#34;Every book is a new adventure waiting to be discovered&#34;
              </p>
              <div className="mt-8 flex justify-center">
                <a 
                  href="/demo/book-details" 
                  className={`inline-flex items-center px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-semibold shadow-lg hover:shadow-xl border-2 border-black focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 text-lg ${geist.className}`}
                  style={{ letterSpacing: '0.02em' }}
                >
                  View Book Details Demo
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
