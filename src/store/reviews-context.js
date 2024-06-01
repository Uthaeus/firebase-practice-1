import { createContext } from "react";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import { doc, addDoc, getDocs, updateDoc, deleteDoc, collection } from "firebase/firestore";

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
        const fetchReviews = async () => {
            const querySnapshot = await getDocs(db.collection("reviews"));
            setReviews(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);

        }

        fetchReviews();
    }, []);

    const addReview = (review) => {
        const docRef = collection(db, "reviews");
        addDoc(docRef, review).then(() => {
            setReviews([...reviews, review]);
        })
        .catch((error) => {
            console.log("Error adding document: ", error);
        });
    }

    const updateReview = (review) => {
        const docRef = doc(db, "reviews", review.id);
        updateDoc(docRef, review).then(() => {
            setReviews(reviews.map(r => r.id === review.id ? review : r));
        })
        .catch((error) => {
            console.log("Error updating document: ", error);
        });
    }

    const deleteReview = (id) => {
        const docRef = doc(db, "reviews", id);
        deleteDoc(docRef).then(() => {
            setReviews(reviews.filter(r => r.id !== id));
        })
        .catch((error) => {
            console.log("Error deleting document: ", error);
        });
    }

    const value = { reviews, addReview, updateReview, deleteReview };

    return (
        <ReviewsContext.Provider value={value}>
            { !isLoading && children}
        </ReviewsContext.Provider>
    );
}