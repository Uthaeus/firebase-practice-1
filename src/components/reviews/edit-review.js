import { useNavigate, useParams } from "react-router";
import { useContext, useState, useEffect } from "react";

import { ReviewsContext } from "../../store/reviews-context";

import ReviewForm from "./review-form";

import Button from "../ui/button";

export default function EditReview() {

    const { id } = useParams();
    const { reviews, deleteReview } = useContext(ReviewsContext);
    const [review, setReview] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        setReview(reviews.find(review => review.id === id));
    }, [reviews, id]);

    const deleteHandler = () => {
        deleteReview(review);
        navigate("/reviews");
    }

    return (
        <div className="review-container">
            <h2 className="review-title">Edit Review</h2>

            <ReviewForm review={review} />

            <div className="review-actions">
                <Button text="Delete Review" onClick={deleteHandler} style='button-delete' />
                <Button text="Back to Reviews" onClick={() => navigate("/reviews")} style='button-secondary' />
                <Button text="Back to Home" onClick={() => navigate("/")} />
            </div>
        </div>
    );
}