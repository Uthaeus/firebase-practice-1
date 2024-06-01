import { createContext } from "react";
import { useEffect, useState } from "react";

const dummyAdmin = {
    username: "admin",
    email: "admin@me.com",
    id: 11,
    role: "admin",
}

export const UserContext = createContext({
    user: null,
    isAdmin: false,
    updateUser: () => {},
    logout: () => {},
});

export default function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        console.log('setting user');
        setUser(dummyAdmin);
        setIsAdmin(true);
    }, []);

    const updateUser = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    const value = { user, isAdmin, updateUser, logout };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}