import { useContext } from "react";
import { useAxios } from "./useAxios";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";

// import axios from "axios";

export default function useServer() {
    // const axios = useAxios();

    const {user} = useContext(AuthContext)
    const name = user?.displayName;
    async function saveUser(
        email: string,
        // role: string
        // lessonsTaken = 0,
        // wpmRecords = [],
        // cpmRecords = [],
        // accuracryRecords = [],
        // practiceTime = 0
    ) {
        const data : user = { name: name as string, email: email, role: "student", wpmRecords: [], cpmRecords: [], accuracyRecords: [], praticeTime: 0 };
        try {
            await axios.post("https://type-storm-server-one.vercel.app/api/v1/users/", data).then(() => {
                console.log("User post successful", data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function getHighScores() {
        try{
            const response = await axios.get("https://type-storm-server-one.vercel.app/api/v1/users/dashboard/high-scores");
            console.log("High scores data:", response?.data);
            return response?.data;
        } catch(error){
            console.log("Error while getting high scores: ", error);
            throw error;
        }
    }

    return {saveUser, getHighScores};
}
