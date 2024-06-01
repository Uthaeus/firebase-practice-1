import { createContext } from "react";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { db } from "../firebase";
import { auth } from "../firebase";


export const UserContext = createContext({
    user: null,
    isAdmin: false,
    updateUser: () => {},
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
        }

        setLoading(false);
    }

    const updateUser = (data) => {

        const docRef = doc(db, "users", user.id);
        updateDoc(docRef, data).then(() => {
            setUser({ ...user, ...data });
        })
        .catch((error) => {
            console.log("Error updating document: ", error);
        });
    }

    const logout = () => {
        signOut(auth);
    }

    const value = { user, isAdmin, updateUser, logout };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}