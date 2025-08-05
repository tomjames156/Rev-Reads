"use client";

import React, { useState } from "react";
import { reviews } from "../data/reviewData";
import { users } from "../data/userData";
import { books } from "../data/sampleData";
import { bodoni } from "../fonts";
import Image from "next/image";
import ReviewForm from "./ReviewForm";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { ReviewFormData } from "../types";

// Book type definition
interface Book {
  id: string;
  title: string;
  author: string;
  genres?: string[];
  rating?: number;
  book_image?: string;
}

// Helper to get book info by id
function getBookById(bookId: string): Book | undefined {
  return (books as Book[]).find((book) => book.id === bookId);
}

// For demo, let's assume the current user is the first user in userData
const CURRENT_USER_ID = users[0].id;

const UsersReviews: React.FC = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  
  // Filter reviews for the current user
  const userReviews = reviews.filter((review) => review.userId === CURRENT_USER_ID);

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  const handleAddReview = (formData: ReviewFormData) => {
    // Here you would typically save the review to your backend
    console.log('New review:', formData);
    setShowAddReview(false);
    // You could also add the review to the local state for immediate display
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="flex flex-col mb-6">
        <h1 className={`text-2xl font-bold ${bodoni.className} transition-all duration-700 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Your Reviews
        </h1>
        <button
          onClick={() => setShowAddReview(true)}
          className="bg-black text-white px-4 py-2 mt-4 w-fit self-end rounded hover:bg-gray-800 transition flex items-center gap-1 transition-all duration-700 ease-out"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '200ms'
          }}
        >
          New Review
        </button>
      </div>

      {showAddReview && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${bodoni.className}`}>Add New Review</h2>
              <button
                onClick={() => setShowAddReview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <hr className="my-2 border-t border-gray-200 w-full" />
            <ReviewForm onSubmit={handleAddReview} />
          </div>
        </div>
      )}

      {userReviews.length === 0 ? (
        <p className="text-gray-600 transition-all duration-700 ease-out"
          style={{
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms'
          }}>
          You haven&#39;t left any reviews yet.
        </p>
      ) : (
        <ul className="space-y-6">
          {userReviews.map((review, index) => {
            const book = getBookById(review.bookId);
            return (
              <li
                key={review.id}
                className="flex items-start bg-white shadow rounded-lg p-4 transition-all duration-700 ease-out"
                style={{
                  opacity: isIntersecting ? 1 : 0,
                  transform: isIntersecting ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {book?.book_image ? (
                  <div className="w-20 h-28 relative mr-4 flex-shrink-0">
                    <Image
                      src={`/books/${book.book_image}`}
                      alt={book.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-28 bg-gray-200 rounded mr-4 flex-shrink-0" />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{book?.title || "Unknown Book"}</h2>
                  <p className="text-sm text-gray-500 mb-2">{book?.author}</p>
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-500 font-bold mr-2">
                      {review.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-xs">/ 5</span>
                  </div>
                  <p className="text-gray-800">{review.review}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UsersReviews;
