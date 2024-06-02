import { useParams, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../store/user-context";
import { ReviewsContext } from "../../store/reviews-context";

import Button from "../ui/button";

export default function ReviewDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { user, isAdmin } = useContext(UserContext);

    const { reviews, deleteReview } = useContext(ReviewsContext);

    const [review, setReview] = useState({});

    useEffect(() => {
        setReview(reviews.find(review => review.id === id));
    }, [reviews, id]);

    const deleteHandler = () => {
        deleteReview(review.id);
        navigate("/reviews");
    }

    return (
        <div className="review-detail">
            
            <div className="review-detail-header">
                <h1 className="review-detail-title">{review?.title}</h1>

                <p className="review-detail-category">{review?.category}</p>

                <p className="review-detail-author">posted by: {review?.author}</p>
            </div>

            <div className="review-detail-body">
                <p className="review-detail-content">{review?.content}</p>
            </div>

            <div className="review-detail-actions">
                {(isAdmin || review?.uid === user?.id) && (
                    <>
                        <Button text="Delete Review" onClick={deleteHandler} style='button-delete' />
                        <Button text="Edit Review" onClick={() => navigate(`/reviews/${review.id}/edit`)} style='button-edit' />
                    </>
                )}
                <Button text="Back to Reviews" onClick={() => navigate("/reviews")} style='button-secondary' />
                <Button text="Back to Home" onClick={() => navigate("/")} />
            </div>
        </div>
    );
}