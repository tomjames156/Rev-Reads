export interface Book {
  id: string;
  title: string;
  author: string;
  genres: string[];
  description?: string;
  rating?: number;  // Rating out of 5
}

export const books: Book[] = [
  {
    id: '18',
    title: 'Pride And Prejudice',
    author: 'Jane Austen',
    genres: ['Romance', 'Classic Literature', 'Novel of Manners'],
    rating: 4.8
  },
  {
    id: '17',
    title: 'Americanah',
    author: 'Chimamanda Ngozi Adichie',
    genres: ['Contemporary Fiction', 'Literary Fiction'],
    rating: 4.5
  },
  {
    id: '19',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genres: ['Southern Gothic', 'Bildungsroman', 'Historical Fiction', 'Legal Drama', 'Classic'],
    rating: 4.9
  },
  {
    id: '9',
    title: 'Purple Hibiscus',
    author: 'Chimamanda Ngozi Adichie',
    genres: ['Fiction']
  },
  {
    id: '20',
    title: 'The Holy Bible, Revised Standard Version',
    author: 'Various',
    genres: ['Religious Text', 'Christianity', 'Bible']
  },
  {
    id: '2',
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    genres: ['Historical Fiction', 'Cultural Fiction', 'Tragedy'],
    rating: 4.7
  },
  {
    id: '3',
    title: 'Seige and Storm',
    author: 'Leigh Bardugo',
    genres: ['Fantasy', 'Young Adult', 'Adventure']
  },
  {
    id: '4',
    title: 'Department-Q',
    author: 'Jussi Adler-Olsen',
    genres: ['Crime Thriller', 'Nordic Noir', 'Mystery']
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    genres: ['Self-Help', 'Personal Development', 'Psychology'],
    rating: 4.8
  },
  {
    id: '6',
    title: 'The Alchemist',
    author: 'Paulo Coehlo',
    genres: ['Philosophical Fiction', 'Fantasy', 'Inspirational'],
    rating: 4.6
  },
  {
    id: '7',
    title: 'Nearly All The Men In Lagos Are Mad',
    author: 'Damilare Kuku',
    genres: ['Contemporary Fiction', 'Short Stories', 'African Literature']
  },
  {
    id: '1',
    title: 'Half of a Yellow Sun',
    author: 'Chimamanda Ngozi Adichie',
    genres: ['Historical Fiction', 'War Fiction', 'Political Fiction'],
    rating: 4.7
  },
  {
    id: '8',
    title: 'Rogue Lawyer',
    author: 'John Grisham',
    genres: ['Legal Thriller', 'Crime Fiction', 'Suspense'],
    rating: 4.2
  },
  {
    id: '10',
    title: 'The Power of Now',
    author: 'Eckhar Tolle',
    genres: ['Spirituality', 'Self-Help', 'Mindfulness'],
    rating: 4.7
  },
  {
    id: '13',
    title: 'In Pursuit of Vision: Exploring the Virtues of Divine Guidance',
    author: 'David O. Oyedepo',
    genres: ['Christian Inspirational', 'Religious', 'Spiritual Growth']
  },
  {
    id: '14',
    title: 'Ruin and Rising',
    author: 'Leigh Bardugo',
    genres: ['Fantasy', 'Young Adult', 'Romance'],
    rating: 4.4
  },
  {
    id: '15',
    title: "The Queen's Gambit",
    author: 'Walter Tevis',
    genres: ['Psychological Fiction', 'Coming-of-Age', 'Sports Fiction'],
    rating: 4.6
  },
  {
    id: '16',
    title: 'Sunrise on the Reaping',
    author: 'Suzanne Collins',
    genres: ['Science Fiction']
  }
];
