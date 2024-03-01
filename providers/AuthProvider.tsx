"use client";
import { auth } from "@/config/firebase.config";
import useServer from "@/hooks/useServer";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import React, { ReactNode, createContext, useEffect, useState } from "react";

type createUser = (email: string, password: string) => Promise<UserCredential>;
type signIn = (email: string, password: string) => Promise<UserCredential>;
type googleSignIn = () => Promise<UserCredential>;
type githubSignIn = () => Promise<UserCredential>;
type logOut = () => Promise<void>;
type updateUser = (user: User, displayName: string) => Promise<void>;

type AuthContextValuesType = {
    user: User | null;
    loading: boolean;
    createUser: createUser;
    signIn: signIn;
    googleSignIn: googleSignIn;
    githubSignIn: githubSignIn;
    logOut: logOut;
    updateUser: updateUser;
};

const defaultAuthState: AuthContextValuesType = {
    user: null,
    loading: true,
    createUser: () => Promise.reject(),
    signIn: () => Promise.reject(),
    googleSignIn: () => Promise.reject(),
    githubSignIn: () => Promise.reject(),
    logOut: () => Promise.reject(),
    updateUser: () => Promise.reject()
};

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export const AuthContext = createContext(defaultAuthState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const {saveUser} = useServer();

    const createUser: createUser = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            // saveUser(email, "student");
            setLoading(false);
            return userCredential;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const signIn: signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setLoading(false);
            return userCredential;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const googleSignIn: googleSignIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithPopup(
                auth,
                googleAuthProvider
            );
            setLoading(false);
            return userCredential;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const githubSignIn: githubSignIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithPopup(
                auth,
                githubAuthProvider
            );
            setLoading(false);
            return userCredential;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const logOut: logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const updateUser: updateUser = async (user: User, displayName: string) => {
        setLoading(true);
        try {
            await updateProfile(user, { displayName });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (currentUser: User | null) => {
                setUser(currentUser);
                setLoading(false);
            }
        );

        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                createUser,
                signIn,
                googleSignIn,
                githubSignIn,
                logOut,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
