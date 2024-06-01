import { createContext } from "react";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

import { db } from "../firebase";
import { auth } from "../firebase";


export const UserContext = createContext({
    user: null,
    isAdmin: false,
    updateUserContext: () => {},
    logout: () => {},
});

export default function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('setting user');
        const unsubscribe = onAuthStateChanged(auth, initializeUser);

        return () => unsubscribe();
    }, []);

    const initializeUser = async (user) => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUser({id: user.uid, ...userData });
                if (userData.role === "admin") {
                    setIsAdmin(true);
                }
            }
        } else {
            setUser(null);
            setIsAdmin(false);
        }

        setLoading(false);
    }

    const updateUserContext = async (data) => {

        try {
            const updatedUser = { ...user, ...data };
            await updateDoc(doc(db, "users", user.id), updatedUser);
            setUser(updatedUser);
            await updateProfile(auth.currentUser, {
                displayName: data.username,
                email: data.email
            })
        } catch (error) {
            console.log("Error updating document: ", error);
        }
        
    }

    const logout = () => {
        signOut(auth);
    }

    const value = { user, isAdmin, updateUserContext, logout };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}