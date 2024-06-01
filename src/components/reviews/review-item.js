
export default function ReviewItem({ review }) {

    return (
        <div className="review-item">
            <h2 className="review-item-title">{review.title}</h2>
            <div className="review-item-details">
                <p className="review-item-category">{review.category}</p>
                <p className="review-item-author">{review.author}</p>
            </div>
        </div>
    );
}