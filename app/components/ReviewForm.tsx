'use client';

import React, { useState, useEffect } from 'react';
import { ReviewFormData } from '../types';
import { books } from '../data/sampleData';
import Link from 'next/link';

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    bookTitle: '',
    author: '',
    reviewText: '',
    rating: 5,
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof books>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);
  const [ratingInput, setRatingInput] = useState('5');
  const [ratingError, setRatingError] = useState('');

  // Search books based on query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowSearchResults(true);
  }, [searchQuery]);

  const handleBookSelect = (book: typeof books[0]) => {
    setSelectedBook(book);
    setFormData(prev => ({
      ...prev,
      bookTitle: book.title,
      author: book.author
    }));
    setSearchQuery(book.title);
    setShowSearchResults(false);
  };

  const validateRating = (value: string): boolean => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setRatingError('Please enter a valid number');
      return false;
    }
    if (numValue < 1 || numValue > 5) {
      setRatingError('Rating must be between 1 and 5');
      return false;
    }
    setRatingError('');
    return true;
  };

  const handleRatingChange = (value: string) => {
    setRatingInput(value);
    if (value === '') {
      setRatingError('');
      return;
    }
    validateRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) {
      alert('Please select a book from the search results');
      return;
    }
    
    if (!validateRating(ratingInput)) {
      return;
    }

    const rating = parseFloat(ratingInput);
    onSubmit({
      ...formData,
      rating
    });
    
    setFormData({ bookTitle: '', author: '', reviewText: '', rating: 5 });
    setSelectedBook(null);
    setSearchQuery('');
    setRatingInput('5');
    setRatingError('');
  };

  const clearSelection = () => {
    setSelectedBook(null);
    setSearchQuery('');
    setFormData(prev => ({ ...prev, bookTitle: '', author: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div className="relative">
        <label htmlFor="bookSearch" className="block text-base font-medium mb-3">
          Search for a Book
        </label>
        <input
          type="text"
          id="bookSearch"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type to search for a book..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          required
        />
        
        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium">{book.title}</div>
                <div className="text-sm text-gray-600">by {book.author}</div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {showSearchResults && searchResults.length === 0 && searchQuery.trim() !== '' && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4">
            <p className="text-gray-600 mb-3">No books found matching &#34;{searchQuery}&#34;</p>
            <Link 
              href="/add-book" 
              className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
            >
              Add New Book
            </Link>
          </div>
        )}

        {/* Selected Book Display */}
        {selectedBook && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-green-800">{selectedBook.title}</div>
                <div className="text-sm text-green-600">by {selectedBook.author}</div>
              </div>
              <button
                type="button"
                onClick={clearSelection}
                className="text-green-600 hover:text-green-800 text-sm"
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="rating" className="block text-base font-medium mb-3">
          Rating (1-5)
        </label>
        <input
          type="text"
          id="rating"
          value={ratingInput}
          onChange={(e) => handleRatingChange(e.target.value)}
          placeholder="Enter a number between 1 and 5"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black ${
            ratingError ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {ratingError && (
          <p className="text-red-500 text-sm mt-1">{ratingError}</p>
        )}
      </div>

      <div>
        <label htmlFor="reviewText" className="block text-base font-medium mb-3">
          Your Review
        </label>
        <textarea
          id="reviewText"
          value={formData.reviewText}
          onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black h-32"
          placeholder="Share your thoughts about this book..."
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
        disabled={!selectedBook || !!ratingError}
      >
        Post Review
      </button>
    </form>
  );
}
