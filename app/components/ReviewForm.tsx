'use client';

import React, { useState } from 'react';
import { ReviewFormData } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ bookTitle: '', author: '', reviewText: '', rating: 5 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div>
        <label htmlFor="bookTitle" className="block text-sm font-medium mb-1">
          Book Title
        </label>
        <input
          type="text"
          id="bookTitle"
          value={formData.bookTitle}
          onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="author" className="block text-sm font-medium mb-1">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium mb-1">
          Rating (1-5)
        </label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="reviewText" className="block text-sm font-medium mb-1">
          Your Review
        </label>
        <textarea
          id="reviewText"
          value={formData.reviewText}
          onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Post Review
      </button>
    </form>
  );
}
