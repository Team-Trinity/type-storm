"use client";

import { HighScores } from "@/components/high-scores/high-scores";
import { UserClient } from "@/components/tables/user-tables/client";
import useServer from "@/hooks/useServer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
    // const { getHighScores } = useServer();
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://type-storm-server-one.vercel.app/api/v1/users/dashboard/high-scores"
                );
                setHighScores(response?.data);
                console.log(response?.data);
            } catch (error) {
                console.log(error);
                throw error;
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="flex-1 p-4">
                <div className="overflow-x-auto ">
                    <table className="mx-auto min-w-[90%] border  shadow-md">
                        <thead>
                            <tr className="bg-[#333333] text-white">
                                <th className="border-b px-6 py-3 text-left">
                                    Name
                                </th>
                                <th className="border-b px-6 py-3 text-left">
                                    Wpm
                                </th>
                                <th className="border-b px-6 py-3 text-left">
                                    CPM
                                </th>
                                <th className="border-b px-6  py-3 text-end">
                                    Position
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {highScores.map((highScore, index) => (
                                <HighScores key={index} highScore={highScore} index={index}></HighScores>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <UserClient data={highScores} />  */}
            </div>
        </>
    );
}
