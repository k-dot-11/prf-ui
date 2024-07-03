import React, { createContext, useEffect, useState } from "react";
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    User,
} from "firebase/auth";
import { firebaseApp } from "../lib/firebase";

// Create the Auth context
export const AuthContext = createContext<User | null>(null);

// Create the Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const auth = getAuth(firebaseApp);
    setPersistence(auth, browserSessionPersistence);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
