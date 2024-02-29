import { useAxios } from "./useAxios";

export default function useServer() {
    const axios = useAxios();

    async function saveUser(
        email: string,
        role: string
        // lessonsTaken = 0,
        // wpmRecords = [],
        // cpmRecords = [],
        // accuracryRecords = [],
        // practiceTime = 0
    ) {
        const data = { email: email, role: role };
        try {
            await axios.post("/", data).then(() => {
                console.log("User post successful", data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function getHighScores() {}

    return [saveUser, getHighScores];
}
