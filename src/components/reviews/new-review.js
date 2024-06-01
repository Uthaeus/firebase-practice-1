import { useNavigate } from "react-router";

import ReviewForm from "./review-form";

import Button from "../ui/button";

export default function NewReview() {

    const navigate = useNavigate();

    return (
        <div className="review-container">
            <h2 className="review-title">New Review</h2>
            <ReviewForm />

            <div className="review-actions">
                <Button text="Back to Home" onClick={() => navigate("/")} />
            </div>
        </div>
    );
}