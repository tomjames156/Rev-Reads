export interface Review {
  id: string;
  bookId: string;
  userId: string;
  review: string;
  rating: number;
}

export const reviews: Review[] = [
  {
    id: "1",
    bookId: "1",
    userId: "178b476c-8378-4679-9b70-8c10bc987938",
    review: "I loved it a lot",
    rating: 4.90
  },
  {
    id: "2",
    bookId: "1",
    userId: "73bd1057-a65d-4b6f-9d41-031f6ab5f441",
    review: "It was a very heart-wrenching experience with awesome storytelling",
    rating: 4.5 // Added default rating since it was missing in CSV
  },
  {
    id: "3",
    bookId: "1",
    userId: "138c61fc-b802-43cd-a049-5a34b23fece4",
    review: "Not usually my kind of book but I loved reading it, a difficult read",
    rating: 4.00
  },
  {
    id: "4",
    bookId: "2",
    userId: "178b476c-8378-4679-9b70-8c10bc987938",
    review: "Escapism at it's finest",
    rating: 5.00
  },
  {
    id: "5",
    bookId: "5",
    userId: "178b476c-8378-4679-9b70-8c10bc987938",
    review: "Reading this book changed something in me",
    rating: 4.5 // Added default rating since it was missing in CSV
  },
  {
    id: "6",
    bookId: "6",
    userId: "178b476c-8378-4679-9b70-8c10bc987938",
    review: "A very motivational book without being a self-help book",
    rating: 5.00
  },
  {
    id: "7",
    bookId: "6",
    userId: "73bd1057-a65d-4b6f-9d41-031f6ab5f441",
    review: "A very interesting and captivating read with a beautiful depiction of romance",
    rating: 4.50
  }
];
