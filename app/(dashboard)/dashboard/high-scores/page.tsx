"use client";

import { HighScores } from "@/components/high-scores/high-scores";
import { UserClient } from "@/components/tables/user-tables/client";
import useServer from "@/hooks/useServer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
    // const { getHighScores } = useServer();
    const [usersData, setUsersData] = useState<user[]>();
    const { getUsers } = useServer();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUsers();
                const sortedData = userData.sort((a, b) => {
                    return (
                        Math.max(...b.wpmRecords) - Math.max(...a.wpmRecords)
                    );
                });
                setUsersData(sortedData);
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
                            {usersData?.map((user, index) => {
                                return (
                                    <tr key={index} className="">
                                        <td className="border-b px-6 py-4">
                                            {user.name}
                                        </td>
                                        <td className="border-b px-6 py-4">
                                            {user.wpmRecords.length > 0
                                                ? Math.max(...user.wpmRecords)
                                                : 0}
                                        </td>
                                        <td className="border-b px-6 py-4">
                                            {user.cpmRecords.length > 0
                                                ? Math.floor(
                                                      Math.max(
                                                          ...user.cpmRecords
                                                      )
                                                  )
                                                : 0}
                                        </td>
                                        <td className="border-b px-6 py-4 text-end">
                                            {index + 1}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* <UserClient data={highScores} />  */}
            </div>
        </>
    );
}
