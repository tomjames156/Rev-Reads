import { Review } from '../types';
import { users } from '../data/userData';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Find the user by username
  const user = users.find(u => u.username === review.reviewedBy) || 
               users.find(u => u.id === review.reviewedBy) ||
               { username: review.reviewedBy, id: review.reviewedBy };
  
  // Generate a consistent color based on user ID
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  const colorIndex = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-brown">{user.username}</h3>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{review.rating}/5</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{review.reviewText}</p>
      
      <div className="text-sm text-gray-500">
        <p>{new Date(review.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
