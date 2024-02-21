"use client";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Button } from "../ui/button";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className="container mx-auto">
            <div className="my-20 flex flex-col shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] md:flex-row">
                <div className="ml-6 flex  items-center border-r-2 pr-8">
                    {/* <img
                        className="h-[120px] w-[120px] rounded-lg bg-slate-500 object-cover duration-500"
                        src={"https://i.ibb.co/t8RMzSJ/employee-skills-12305144.png"}
                        alt=""
                    /> */}
                    <div className="ml-8">
                        <h2 className="font-sans text-3xl font-medium text-gray-400">
                            {user?.displayName}
                        </h2>
                        <p className="text-md font-sans text-gray-500">
                            joined 21 Feb 2024
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-8 border-r-2 p-10 text-center">
                    <div className="space-y-1">
                        <p className="text-md font-sans text-gray-400">
                            Top Speed
                        </p>
                        <p className="text-3xl tracking-wider text-gray-600">
                            230
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-md font-sans text-gray-400">
                           Average Speed
                        </p>
                        <p className="text-3xl tracking-wider text-gray-600">
                            1010
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-md font-sans text-gray-400">
                            Words Typed
                        </p>
                        <p className="text-3xl tracking-wider text-gray-600">
                            65
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-8 p-10 border-r-2">
                <div className="space-y-1">
                        <p className="text-md font-sans text-gray-400">
                            Lessions
                        </p>
                        <p className="text-3xl tracking-wider text-gray-600">
                            223
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-md font-sans text-gray-400">
                            Accuracy
                        </p>
                        <p className="text-3xl tracking-wider text-gray-600">
                            95%
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-md font-sans text-gray-400">
                            Ranking
                        </p>
                        <p className="text-3xl tracking-wider text-gray-600">
                            2230
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-8  p-10">
                    <Button>Edit</Button>
                    <Button>Copy Profile</Button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
