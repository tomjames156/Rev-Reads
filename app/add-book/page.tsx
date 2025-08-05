'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { bodoni } from '../fonts';

export default function AddBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genres: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the book to your backend
    console.log('New book:', formData);
    // For now, just redirect back to the reviews page
    router.push('/your-reviews');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link 
          href="/your-reviews" 
          className="text-green-600 hover:text-green-800 mb-4 inline-block"
        >
          ← Back to Reviews
        </Link>
        <h1 className={`text-2xl font-bold ${bodoni.className}`}>Add New Book</h1>
        <p className="text-gray-600 mt-2">Add a book that&#39;s not in our catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            required
          />
        </div>

        <div>
          <label htmlFor="genres" className="block text-sm font-medium mb-1">
            Genres (comma-separated)
          </label>
          <input
            type="text"
            id="genres"
            value={formData.genres}
            onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="e.g., Fiction, Mystery, Romance"
          />
        </div>

        <div className="flex gap-4">
          <Link
            href="/your-reviews"
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
} 