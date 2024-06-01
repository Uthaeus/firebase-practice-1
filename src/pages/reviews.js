import { useState } from "react";

import ReviewItem from "../components/reviews/review-item";
import Header from "../components/header";

const dummyReviews = [

    {
        id: 1,
        uid: "1",
        title: "Title Here",
        category: "book",
        author: "Jimmy the Pirate",
        content: "here's a whole bunch of content here, and here's another one. Keep going with the content so that there's enough to take up some space."
    },

    {
        id: 2,
        uid: "2",
        title: "Something else",
        category: "movie",
        author: "D Debs",
        content: "here's a whole bunch of content here, and here's another one. Keep going with the content so that there's enough to take up some space."
    }
]

export default function Reviews() {

    const [reviews, setReviews] = useState(dummyReviews);

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