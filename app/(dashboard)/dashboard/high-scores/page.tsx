"use client"
import { UserClient } from "@/components/tables/user-tables/client";
import { highScores } from "@/constants/data";
import useServer from "@/hooks/useServer";
import { useEffect } from "react";

export default function page() {
    const { getHighScores } = useServer();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHighScores();
                console.log("from high scores page: >>", data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
                <UserClient data={highScores} />
            </div>
        </>
    );
}
