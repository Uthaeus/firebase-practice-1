import { useForm } from "react-hook-form";
import { useEffect } from "react";

import Button from "../ui/button";

export default function ReviewForm({ review }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (review) {
            reset(review);
        }
    }, [ review, reset ]);

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="review-form">

            <input
                className="review-form-input"
                type="text"
                placeholder="title"
                {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}

            <textarea
                className="review-form-input"
                placeholder="review"
                {...register("review", { required: true })}
            />
            {errors.review && <span>This field is required</span>}

            <Button text="Submit Review" />
        </form>
    );
}