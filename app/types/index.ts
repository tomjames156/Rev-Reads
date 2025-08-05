export interface Review {
  id: string;
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number;
  reviewedBy: string;
  createdAt: string;
}

export interface ReviewFormData {
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number;
}
