import { useForm } from "react-hook-form";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { setDoc, doc, addDoc, collection, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";

import { UserContext } from "../../store/user-context";
import { ReviewsContext } from "../../store/reviews-context";

import Button from "../ui/button";

export default function ReviewForm({ review }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { user } = useContext(UserContext);

    const { addReview, updateReview } = useContext(ReviewsContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (review) {
            reset(review);
        }
    }, [ review, reset ]);

    const onSubmit = async (data) => {
        
        try {
            const reviewObj = { ...data, author: user.username, uid: user.id };

            if (review) {
                const docRef = doc(db, "reviews", review.id);
                await updateDoc(docRef, reviewObj);
                updateReview(reviewObj);
            } else {
                const docRef = await addDoc(collection(db, "reviews"), reviewObj);
                addReview({ ...reviewObj, id: docRef.id });
            }

        } catch (error) {
            console.log('review form error: ', error);
        } finally {
            navigate("/reviews");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="review-form">
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            autoFocus={true}
                            {...register("title", { required: true })}
                        />

                        {errors.title && <span>This field is required</span>}
                    </div>
                </div>

                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" className="form-select" {...register("category", { required: true })}>
                            <option value="general">General</option>
                            <option value="book">Book</option>
                            <option value="movie">Movie</option>
                            <option value="music">Music</option>
                            <option value="game">Game</option>
                        </select>

                        {errors.category && <span>This field is required</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Add your review here</label>
                    <textarea
                        id="content"
                        className="form-control"
                        rows="5"
                        {...register("content", { required: true })}
                    />

                    {errors.review && <span>This field is required</span>}
                </div>
            </div>

            <Button text="Submit Review" />
        </form>
    );
}