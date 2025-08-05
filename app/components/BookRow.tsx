'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book } from '../data/sampleData';
import StarRating from './StarRating';
import { bodoni } from '../fonts';

interface BookRowProps {
  title: string;
  books: Book[];
}

export default function BookRow({ title, books }: BookRowProps) {
  const [showAll, setShowAll] = useState(false);
  const hasMoreBooks = books.length > 4;
  const displayedBooks = showAll ? books : books.slice(0, 4);

  const sectionId = `category-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
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
    <div className="my-12" id={sectionId}>
      <h2 className={`text-2xl font-bold mb-6 text-brand-brown ${bodoni.className}`}>{title}</h2>
      <div className={`flex flex-wrap justify-center sm:justify-start ${showAll ? 'transition-all duration-300' : ''}`}>
        {displayedBooks.map((book) => (
          <Link 
            href={`/book/${book.id}`} 
            key={book.id} 
            className="group w-full sm:w-1/2 lg:w-1/4 pr-8 mb-12"
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
        <button
          onClick={handleToggle}
          className="mt-6 text-brand-green hover:text-brand-green-dark font-medium text-sm flex items-center gap-1 transition-colors"
        >
          {showAll ? 'Show Less' : 'See All'}
          <svg
            className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
