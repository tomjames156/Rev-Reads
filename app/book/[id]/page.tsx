'use client';

import { useParams } from 'next/navigation';
import { books } from '../../data/sampleData';
import { reviews } from '../../data/reviewData';
import { users } from '../../data/userData';
import BookDetails from '../../components/BookDetails';
import Navigation from '../../components/Navigation';
import { notFound } from 'next/navigation';

export default function BookPage() {
  const params = useParams();
  const bookId = params.id as string;

  // Find the book by ID
  const book = books.find(b => b.id === bookId);

  if (!book) {
    notFound();
  }

  // Convert reviewData format to match the Review interface
  const formattedReviews = reviews
    .filter(review => review.bookId === bookId)
    .map(review => {
      const user = users.find(u => u.id === review.userId);
      return {
        id: review.id,
        bookTitle: book.title,
        author: book.author,
        reviewText: review.review,
        rating: review.rating,
        reviewedBy: user ? user.username : `User ${review.userId.slice(0, 8)}`,
        createdAt: new Date().toISOString(), // Using current date as fallback
      };
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-brown/5 to-brand-green/5">
      <Navigation />
      <BookDetails book={book} reviews={formattedReviews} />
    </div>
  );
} 