import { Link } from "react-router-dom";

export default function ReviewItem({ review }) {

    return (
        <div className="review-item">
            <Link to={`/reviews/${review.id}`} className="review-item-title">{review.title}</Link>

            <div className="review-item-details">
                <p className="review-item-category">{review.category}</p>
                <p className="review-item-author">posted by {review.author}</p>
            </div>
        </div>
    );
}