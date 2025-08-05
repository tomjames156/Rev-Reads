# Book Details Component

A comprehensive React component for displaying detailed information about books, including cover images, author information, ratings, reviews, and more.

## Features

- **Book Information Display**: Shows title, author, genres, and description
- **Book Cover Image**: Displays book cover with fallback for missing images
- **Star Rating System**: Uses the existing StarRating component
- **Reviews Section**: Lists all reviews for the book with pagination
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Consistent Styling**: Follows the existing design system with brand colors
- **Breadcrumb Navigation**: Easy navigation back to home
- **Action Buttons**: Add to reading list and write review functionality

## Components Created

### 1. BookDetails Component (`app/components/BookDetails.tsx`)
The main component that displays comprehensive book information.

**Props:**
- `book: Book` - The book object containing title, author, genres, etc.
- `reviews: Review[]` - Array of reviews for the book

**Features:**
- Responsive grid layout
- Image error handling with fallback
- Average rating calculation
- Genre tags display
- Action buttons for user interactions

### 2. Book Page (`app/book/[id]/page.tsx`)
Dynamic page component that uses the BookDetails component.

**Features:**
- URL-based book selection (`/book/[id]`)
- Automatic book lookup by ID
- Review data formatting
- 404 handling for invalid book IDs

### 3. Demo Page (`app/demo/book-details/page.tsx`)
Demonstration page showing the BookDetails component in action.

**Features:**
- Sample data integration
- Navigation links
- Component showcase

## Usage

### Basic Usage
```tsx
import BookDetails from './components/BookDetails';
import { books } from './data/sampleData';
import { reviews } from './data/reviewData';

// Get a book and its reviews
const book = books[0];
const bookReviews = reviews.filter(review => review.bookId === book.id);

// Render the component
<BookDetails book={book} reviews={bookReviews} />
```

### As a Page
Navigate to `/book/[id]` where `[id]` is the book's ID:
```
/book/1  // Shows details for book with ID "1"
/book/18 // Shows details for "Pride And Prejudice"
```

### Demo Page
Visit `/demo/book-details` to see the component in action with sample data.

## Data Structure

### Book Interface
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  genres: string[];
  description?: string;
  rating?: number;
}
```

### Review Interface
```typescript
interface Review {
  id: string;
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number;
  reviewedBy: string;
  createdAt: string;
}
```

## Styling

The component uses the existing design system:
- **Brand Colors**: `brand-brown`, `brand-green` and their variants
- **Typography**: Bodoni font for headings, Geist for body text
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle shadows for depth
- **Responsive**: Mobile-first design with breakpoints

## Features in Detail

### Image Handling
- Attempts to load book cover from `/book-covers/[id].jpg`
- Falls back to a styled placeholder if image fails to load
- Uses Next.js Image component for optimization

### Rating System
- Calculates average rating from all reviews
- Falls back to book's default rating if no reviews exist
- Uses the existing StarRating component

### Reviews Display
- Shows all reviews for the specific book
- Displays review count
- Empty state with call-to-action when no reviews exist
- Uses the existing ReviewCard component

### Navigation
- Breadcrumb navigation back to home
- Links to individual book pages from book listings
- Demo page with navigation options

## Integration

The component integrates seamlessly with the existing codebase:
- Uses existing data structures and interfaces
- Follows established styling patterns
- Leverages existing components (StarRating, ReviewCard, Navigation)
- Maintains consistent user experience

## Future Enhancements

Potential improvements for the component:
- Add to reading list functionality
- Write review modal/form
- Related books recommendations
- Social sharing features
- Book purchase links
- Reading progress tracking
- User-specific features (favorites, reading lists) 