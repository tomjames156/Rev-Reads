'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book } from '../data/sampleData';
import StarRating from './StarRating';
import { bodoni } from '../fonts';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface BookRowProps {
  title: string;
  books: Book[];
}

export default function BookRow({ title, books }: BookRowProps) {
  const [showAll, setShowAll] = useState(false);
  const hasMoreBooks = books.length > 4;
  const displayedBooks = showAll ? books : books.slice(0, 4);

  const sectionId = `category-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });
  
  const handleToggle = () => {
    setShowAll(!showAll);
    // If we're showing less, scroll to the category title
    if (showAll) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="my-12" id={sectionId} ref={elementRef as React.RefObject<HTMLDivElement>}>
      <h2 className={`text-2xl font-bold mb-6 text-brand-brown ${bodoni.className} transition-all duration-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {title}
      </h2>
      <div className={`flex flex-wrap justify-center sm:justify-start ${showAll ? 'transition-all duration-300' : ''}`}>
        {displayedBooks.map((book, index) => (
          <Link 
            href={`/book/${book.id}`} 
            key={book.id} 
            className="group w-full sm:w-1/2 lg:w-1/4 pr-8 mb-12 transition-all duration-700 ease-out"
            style={{
              opacity: isIntersecting ? 1 : 0,
              transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div className="w-[200px] aspect-[2/3] rounded-lg shadow-md transition transform hover:scale-105 bg-gradient-to-br from-brand-brown/5 to-brand-green/5 border border-brand-brown/10 flex items-center justify-center">
              <span className="text-brand-brown/40 text-sm">Cover</span>
            </div>
            <h3 className={`mt-4 text-base font-medium text-brand-brown-dark group-hover:text-brand-green transition-colors line-clamp-2`}>
              {book.title}
            </h3>
            <p className="mt-2 text-sm text-brand-brown/70">{book.author}</p>
            <div className="mt-2">
              <StarRating rating={book.rating} />
            </div>
          </Link>
        ))}
      </div>
      
      {hasMoreBooks && (
        <div className="text-center mt-8 transition-all duration-700 ease-out"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${displayedBooks.length * 100 + 200}ms`
          }}>
          <button
            onClick={handleToggle}
            className="px-6 py-2 border-2 border-brand-brown text-brand-brown rounded-lg hover:text-green-800 transition-colors font-medium"
          >
            {showAll ? 'Show Less' : `Show All ${books.length} Books`}
          </button>
        </div>
      )}
    </div>
  );
}
