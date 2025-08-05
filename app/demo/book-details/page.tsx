'use client';

import { books } from '../../data/sampleData';
import { reviews } from '../../data/reviewData';
import BookDetails from '../../components/BookDetails';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function BookDetailsDemo() {
  // Use the first book as an example
  const sampleBook = books[0]; // "Pride And Prejudice"
  
  // Convert reviewData format to match the Review interface
  const formattedReviews = reviews
    .filter(review => review.bookId === sampleBook.id)
    .map(review => ({
      id: review.id,
      bookTitle: sampleBook.title,
      author: sampleBook.author,
      reviewText: review.review,
      rating: review.rating,
      reviewedBy: `User ${review.userId.slice(0, 8)}`,
      createdAt: new Date().toISOString(),
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-brown/5 to-brand-green/5">
      <Navigation />
      
      {/* Demo Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-brand-brown mb-2">Book Details Demo</h1>
          <p className="text-brand-brown/70 mb-4">
            This is a demonstration of the BookDetails component showing comprehensive book information.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/" 
              className="px-4 py-2 bg-brand-brown text-white rounded-lg hover:bg-brand-brown-dark transition-colors"
            >
              Back to Home
            </Link>
            <Link 
              href={`/book/${sampleBook.id}`} 
              className="px-4 py-2 border-2 border-brand-green text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors"
            >
              View as Page
            </Link>
          </div>
        </div>
      </div>

      <BookDetails book={sampleBook} reviews={formattedReviews} />
    </div>
  );
} 