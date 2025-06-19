import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { app } from '../Auth/Firebase.config';

const auth = getAuth(app);

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user by email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signIn user by email and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // signIn With Google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // update user information
    const updateUserInfo = async (updates) => {
        
            // Update displayName and/or photoURL
            if (updates.displayName || updates.photoURL) {
                await updateProfile(auth.currentUser, {
                    displayName: updates.displayName,
                    photoURL: updates.photoURL,
                });
            }

            // Update email if provided
            if (updates.email) {
                await updateEmail(auth.currentUser, updates.email);
            }

            // Update password if provided
            if (updates.password) {
                await updatePassword(auth.currentUser, updates.password);
            }
    };

    // signOut User
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Observe User data on state change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])



    const authData = {
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUserInfo
    }


    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;