import { createContext } from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

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

    const updateUserContext = (newUser) => {
        console.log('updating user context', newUser);
        setUser(newUser);
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