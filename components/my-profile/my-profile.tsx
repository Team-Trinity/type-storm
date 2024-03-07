"use client";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Button } from "../ui/button";
import { TypeStateContext } from "@/providers/TypeStateProvider";
import { calculateAverage } from "@/lib/utils";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const { state } = useContext(TypeStateContext);
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
                        <h2 className="font-sans text-3xl font-medium text-primary">
                            {user?.displayName}
                        </h2>
                        <p className="text-md font-sans text-primary">
                            joined 21 Feb 2024
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-8 p-10 text-center">
                    <div className="space-y-1">
                        <p className="text-md font-sans text-primary">
                            Top Speed
                        </p>
                        <p className="text-3xl tracking-wider text-primary">
                            {state.user.wpmRecords.length > 0
                                ? Math.max(...state.user.wpmRecords)
                                : 0}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-md font-sans text-primary">
                            Average Speed
                        </p>
                        <p className="text-3xl tracking-wider text-primary">
                            {Math.floor(
                                calculateAverage(state.user.wpmRecords)
                            )}
                        </p>
                    </div>
                    {/* <div className="space-y-1">
                        <p className="text-md font-sans text-primary">
                            Words Typed
                        </p>
                        <p className="text-3xl tracking-wider text-primary">
                            65
                        </p>
                    </div> */}
                    <div className="space-y-1">
                        <p className="text-md font-sans text-primary">
                            Average CPM
                        </p>
                        <p className="text-3xl tracking-wider text-primary">
                            {Math.floor(
                                calculateAverage(state.user.cpmRecords)
                            )}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-md font-sans text-primary">
                            Lessons
                        </p>
                        <p className="text-3xl tracking-wider text-primary">
                            {state.user.wpmRecords.length}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-md font-sans text-primary">
                            Average Accuracy
                        </p>
                        <p className="text-3xl tracking-wider text-primary">
                            {Math.floor(
                                calculateAverage(state.user.accuracyRecords)
                            )}
                        </p>
                    </div>
                    {/* <div className="space-y-1">
                        <p className="text-md font-sans text-primary">
                            Practice Time
                        </p>
                        <p className="text-3xl tracking-wider text-primary">
                            {state.user.praticeTime}
                        </p>
                    </div> */}
                </div>
                <div className="flex flex-row justify-between gap-8 p-10 "></div>
                <div className="flex flex-row items-center gap-4 border-l-2 p-10">
                    <Button>Edit</Button>
                    <Button>Copy Profile</Button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
