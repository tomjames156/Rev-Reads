"use client";

import Navigation from "../components/Navigation";
import UsersReviews from "../components/UsersReviews";

export default function YourReviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-brown/5 to-brand-green/5">
      <Navigation />
      <UsersReviews />
    </div>
  );
}
