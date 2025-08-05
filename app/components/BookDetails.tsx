'use client';

import Image from 'next/image';
import { Book, books } from '../data/sampleData';
import { Review } from '../types';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';
import { bodoni } from '../fonts';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface BookDetailsProps {
  book: Book;
  reviews: Review[];
}

export default function BookDetails({ book, reviews }: BookDetailsProps) {
  const [imageError, setImageError] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showAISummaryDialog, setShowAISummaryDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiOverview, setAiOverview] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [reviewForm, setReviewForm] = useState({
    rating: '5',
    reviewText: ''
  });
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  // Filter reviews for this specific book
  const bookReviews = reviews.filter(review => 
    review.bookTitle.toLowerCase() === book.title.toLowerCase() &&
    review.author.toLowerCase() === book.author.toLowerCase()
  );

  // Combine original reviews with local reviews
  const allReviews = [...bookReviews, ...localReviews];

  // Calculate average rating from all reviews (original + local)
  const averageRating = allReviews.length > 0 
    ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length 
    : book.rating || 0;

  // Find related books based on shared genres
  const getRelatedBooks = (): Book[] => {
    if (!book.genres || book.genres.length === 0) {
      return [];
    }

    const relatedBooks = books.filter((otherBook: Book) => 
      otherBook.id !== book.id && // Exclude current book
      otherBook.genres && 
      otherBook.genres.some((genre: string) => 
        book.genres!.some((bookGenre: string) => 
          genre.toLowerCase().includes(bookGenre.toLowerCase()) ||
          bookGenre.toLowerCase().includes(genre.toLowerCase())
        )
      )
    );

    // Sort by rating (highest first) and limit to 4 books
    return relatedBooks
      .sort((a: Book, b: Book) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
  };

  const relatedBooks = getRelatedBooks();

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  const handleAIOverview = async () => {
    setShowAIDialog(true);
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setAiOverview(`Based on the reviews and information about "${book.title}" by ${book.author}, here's an AI-generated overview:

This book has received an average rating of ${averageRating.toFixed(1)}/5 stars from ${bookReviews.length} reviews. Readers particularly appreciate the ${book.genres?.join(', ') || 'engaging content'} and find it to be a compelling read.

Key themes that emerge from the reviews include strong character development, engaging plotlines, and thought-provoking content. The book appears to resonate well with its target audience and has generated positive discussions among readers.

Overall, this book seems to be well-received by the reading community and would be a good choice for fans of ${book.genres?.[0] || 'this genre'}.`);
      setIsLoading(false);
    }, 3000);
  };

  const handleWriteReview = () => {
    setShowReviewDialog(true);
  };

  const handleSubmitReview = () => {
    if (!reviewForm.reviewText.trim()) {
      toast.error('Please write a review before submitting.');
      return;
    }

    const rating = parseFloat(reviewForm.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      toast.error('Please enter a valid rating between 1 and 5.');
      return;
    }

    const newReview: Review = {
      id: `local-${Date.now()}`,
      bookTitle: book.title,
      author: book.author,
      reviewText: reviewForm.reviewText,
      rating: rating,
      reviewedBy: 'You',
      createdAt: new Date().toISOString()
    };

    setLocalReviews(prev => [newReview, ...prev]);
    setReviewForm({ rating: '5', reviewText: '' });
    setShowReviewDialog(false);
    toast.success('Review submitted successfully!');
  };

  const handleCancelReview = () => {
    setReviewForm({ rating: '5', reviewText: '' });
    setShowReviewDialog(false);
  };

  const handleAISummary = async () => {
    setShowAISummaryDialog(true);
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const themes = extractThemes(allReviews.map(r => r.reviewText));
      setAiSummary(`AI Analysis of Reviews for "${book.title}" by ${book.author}

SUMMARY:
Based on ${allReviews.length} reviews, this book has an average rating of ${averageRating.toFixed(1)}/5 stars.

KEY THEMES IDENTIFIED:
${themes.map((theme, index) => `${index + 1}. ${theme}`).join('\n')}

REVIEW ANALYSIS:
The reviews indicate that readers particularly appreciate the ${book.genres?.[0] || 'content'} and find the book to be ${averageRating >= 4 ? 'highly engaging' : 'worthwhile'}. 

RECOMMENDATION:
This book appears to be ${averageRating >= 4 ? 'highly recommended' : 'moderately recommended'} by the reading community, especially for fans of ${book.genres?.[0] || 'this genre'}.`);
      setIsLoading(false);
    }, 3000);
  };

  const extractThemes = (reviewTexts: string[]): string[] => {
    const commonWords = [
      'character', 'plot', 'story', 'writing', 'author', 'book', 'read', 'reading',
      'love', 'like', 'enjoy', 'great', 'good', 'amazing', 'wonderful', 'beautiful',
      'interesting', 'engaging', 'compelling', 'thought-provoking', 'emotional',
      'romance', 'fantasy', 'fiction', 'classic', 'modern', 'contemporary'
    ];

    const themeCounts: Record<string, number> = {};

    reviewTexts.forEach(text => {
      const lowerText = text.toLowerCase();
      commonWords.forEach(word => {
        if (lowerText.includes(word)) {
          themeCounts[word] = (themeCounts[word] || 0) + 1;
        }
      });
    });

    // Return top 5 most mentioned themes
    return Object.entries(themeCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([theme]) => theme.charAt(0).toUpperCase() + theme.slice(1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-brown/5 to-brand-green/5" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-md text-brand-brown/70">
            <li>
              <Link href="/" className="hover:text-brand-brown transition-colors">
                Home
              </Link>
            </li>
            <li>
              <span className="text-brand-brown/50">/</span>
            </li>
            <li className="text-brand-brown font-medium">
              {book.title}
            </li>
          </ol>
        </nav>

        {/* Book Header Section */}
        <div className="bg-white rounded-xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 p-4 lg:p-8">
            {/* Book Cover */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative w-48 h-72 sm:w-64 sm:h-96 rounded-lg overflow-hidden">
                {!imageError ? (
                  <Image
                    src={`/book-covers/${book.id}.jpg`}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-brown/20 to-brand-green/20 flex items-center justify-center">
                    <div className="text-center text-brand-brown/60">
                      <div className="text-6xl mb-2">📚</div>
                      <p className="text-sm font-medium">No Cover Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              <div>
                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-brown mb-2 ${bodoni.className}`}>
                  {book.title}
                </h1>
                <p className="text-lg sm:text-xl text-brand-brown/80 mb-4">
                  by <span className="font-semibold">{book.author}</span>
                </p>
              </div>

              {/* Rating Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <StarRating rating={averageRating} className="text-xl sm:text-2xl" />
                <span className="text-base sm:text-lg text-brand-brown/70">
                  {allReviews.length} review{allReviews.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-brand-brown mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-brand-green/10 text-brand-green-dark rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {book.description && (
                <div>
                  <h3 className="text-lg font-semibold text-brand-brown mb-2">Description</h3>
                  <p className="text-brand-brown/80 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button 
                  onClick={handleAIOverview}
                  className="relative px-4 sm:px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium border border-black group cursor-pointer text-sm sm:text-base"
                  title="Get an AI-generated overview of this book"
                >
                  AI Overview
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Get an AI-generated overview of this book
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </button>
                <button 
                  onClick={handleWriteReview}
                  className="relative px-4 sm:px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors font-medium group cursor-pointer text-sm sm:text-base"
                  title="Share your thoughts about this book"
                >
                  Write a Review
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Share your thoughts about this book
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className={`text-2xl sm:text-3xl font-bold text-brand-brown ${bodoni.className}`}>
              Reviews
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <span className="text-brand-brown/70 text-sm sm:text-base">
                {allReviews.length} review{allReviews.length !== 1 ? 's' : ''}
              </span>
              {allReviews.length > 0 && (
                <button 
                  onClick={handleAISummary}
                  className="relative px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium border border-black text-xs sm:text-sm group cursor-pointer"
                  title="Generate an AI summary of all reviews"
                >
                  AI Summary
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Generate an AI summary of all reviews
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {allReviews.length > 0 ? (
            <div className="space-y-6">
              {allReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-brand-brown mb-2">No Reviews Yet</h3>
              <p className="text-brand-brown/70 mb-6">
                Be the first to share your thoughts about this book!
              </p>
              <button 
                onClick={handleWriteReview}
                className="relative px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors font-medium group cursor-pointer"
                title="Be the first to share your thoughts about this book"
              >
                Write the First Review
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Be the first to share your thoughts about this book
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Related Books Section with Animation */}
        <div className="bg-white rounded-xl p-4 lg:p-8 mt-8" ref={elementRef as React.RefObject<HTMLDivElement>}>
          <h2 className={`text-2xl sm:text-3xl font-bold text-brand-brown mb-6 ${bodoni.className} transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 gap-y-12">
            {relatedBooks.length > 0 ? (
              relatedBooks.map((relatedBook, index) => (
                <Link 
                  href={`/book/${relatedBook.id}`} 
                  key={relatedBook.id} 
                  className="group cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-[200px] aspect-[2/3] rounded-lg shadow-md transition transform hover:scale-105 bg-gradient-to-br from-brand-brown/5 to-brand-green/5 border border-brand-brown/10 flex items-center justify-center">
                    <span className="text-brand-brown/40 text-sm">Cover</span>
                  </div>
                  <h3 className={`text-md font-medium text-brand-brown-dark group-hover:text-brand-green transition-colors line-clamp-2 mb-1 mt-2`}>
                    {relatedBook.title}
                  </h3>
                  <p className="text-sm text-brand-brown/70 mb-2">{relatedBook.author}</p>
                  <div className="flex items-center">
                    <StarRating rating={relatedBook.rating} className="text-xs" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8 transition-all duration-700 ease-out"
                style={{
                  opacity: isIntersecting ? 1 : 0,
                  transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '200ms'
                }}>
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-brand-brown mb-2">No Related Books Found</h3>
                <p className="text-brand-brown/70">
                  {book.genres && book.genres.length > 0 
                    ? `We couldn't find other books in the ${book.genres[0]} genre. Try exploring our full catalog!`
                    : "This book doesn't have genre information. Explore our catalog to discover more books!"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Overview Dialog */}
      {showAIDialog && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold text-brand-brown ${bodoni.className}`}>
                  AI Overview
                </h3>
                <button
                  onClick={() => setShowAIDialog(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="flex justify-center items-center space-x-1 mb-4">
                    <div className="w-3 h-3 bg-brand-brown rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-brand-brown rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-brand-brown rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-brand-brown/70">Generating AI overview...</p>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {aiOverview}
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAIDialog(false)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Dialog */}
      {showReviewDialog && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold text-brand-brown ${bodoni.className}`}>
                  Write a Review
                </h3>
                <button
                  onClick={handleCancelReview}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Share your thoughts about &#34;{book.title}&#34; by {book.author}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Rating Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5 stars)
                </label>
                <input
                  type="text"
                  value={reviewForm.rating}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow numeric input with decimal point
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setReviewForm({...reviewForm, rating: value});
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                  placeholder="Enter rating (1-5)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter a value between 1 and 5 (e.g., 4.5 for 4.5 stars)
                </p>
              </div>

              {/* Review Text Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({...reviewForm, reviewText: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent resize-none"
                  rows={6}
                  placeholder="Share your thoughts about this book..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCancelReview}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Summary Dialog */}
      {showAISummaryDialog && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold text-brand-brown ${bodoni.className}`}>
                  AI Review Summary
                </h3>
                <button
                  onClick={() => setShowAISummaryDialog(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                AI-generated analysis of all reviews for &#34;{book.title}&#34;
              </p>
            </div>
            
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="flex justify-center items-center space-x-1 mb-4">
                    <div className="w-3 h-3 bg-brand-brown rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-brand-brown rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-brand-brown rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-brand-brown/70">Analyzing reviews and generating summary...</p>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <pre className="text-gray-700 leading-relaxed whitespace-pre-line font-sans text-sm">
                    {aiSummary}
                  </pre>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAISummaryDialog(false)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}