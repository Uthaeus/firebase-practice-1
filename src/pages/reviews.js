import { useEffect, useContext } from "react";

import ReviewItem from "../components/reviews/review-item";
import Header from "../components/header";

import { ReviewsContext } from "../store/reviews-context";

export default function Reviews() {
    const { reviews } = useContext(ReviewsContext);

    return (
        <div className="reviews-container">

            <Header />

            <h1 className="reviews-title">Reviews</h1>

            <div className="reviews-list">

                {reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}