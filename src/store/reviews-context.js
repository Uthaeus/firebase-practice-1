import { createContext } from "react";
import { useEffect, useState } from "react";

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

export const ReviewsContext = createContext({
    reviews: [],
    addReview: () => {},
    updateReview: () => {},
    deleteReview: () => {},
});

export default function ReviewsContextProvider({ children }) {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('setting reviews');
        setReviews(dummyReviews);
        setIsLoading(false);
    }, [ ]);

    const addReview = (review) => {
        setReviews([...reviews, review]);
    }

    const updateReview = (review) => {
        setReviews(reviews.map(r => r.id === review.id ? review : r));
    }

    const deleteReview = (review) => {
        setReviews(reviews.filter(r => r.id !== review.id));
    }

    const value = { reviews, addReview, updateReview, deleteReview };

    return (
        <ReviewsContext.Provider value={value}>
            { !isLoading && children}
        </ReviewsContext.Provider>
    );
}