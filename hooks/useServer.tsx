"use client";

import { useContext } from "react";
import { useAxios } from "./useAxios";
import { AuthContext } from "@/providers/AuthProvider";

import axios from "axios";

export default function useServer() {
    // const axios = useAxios();

    const { user } = useContext(AuthContext);

    async function createUserData(data: user) {
        try {
            const response = await axios.post<user[]>(
                "https://type-storm-server-one.vercel.app/api/v1/users",
                data
            );
            return response?.data;
        } catch (error) {
            console.log("Error while creating new user data", error);
            throw error;
        }
    }

    async function getUsers() {
        try {
            const response = await axios.get<user[]>(
                "https://type-storm-server-one.vercel.app/api/v1/users"
            );
            return response?.data;
        } catch (error) {
            console.log("Error while getting all user data", error);
            throw error;
        }
    }

    async function updateUserByEmail(email: string, newData: user) {
        try {
            const response = await axios.patch<user[]>(
                `https://type-storm-server-one.vercel.app/api/v1/users/${email}`,
                newData
            );
            return response?.data;
        } catch (error) {
            console.log("Error while getting all user data", error);
            throw error;
        }
    }

    async function getUserByEmail(email: string) {
        try {
            const response = await axios.get<user>(
                `https://type-storm-server-one.vercel.app/api/v1/users/${email}`
            );
            return response?.data;
        } catch (error) {
            console.log("Error while getting all user data", error);
            throw error;
        }
    }

    return { getUsers, getUserByEmail, updateUserByEmail, createUserData };
}
