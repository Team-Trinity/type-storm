"use client"
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AboutDetails = () => {
    const router = useRouter()
    return (
        <div>
            <section className="from-#52C2FF flex w-full flex-col justify-center py-8 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center text-gray-300">
                        {/* Text content */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold tracking-tighter sm:text-1xl md:text-2xl lg:text-3xl">
                                Welcome to Key Storm
                            </h1>
                            <p className="mx-auto max-w-[700px] pt-4">
                                Enhance your typing speed thorugh us.
                            </p>
                        </div>
                        <div className="space-x-4 pt-4">
                        <Button onClick={() => router.push("/")} 
                                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Test Your Skill
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Feature Cards */}
                <div className="container mt-16 flex flex-wrap items-center justify-center gap-9 px-4 md:px-6">
                    <div className="flex flex-col items-center text-center text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-4 h-10 w-10"
                        >
                            <circle cx={12} cy={12} r={10} />
                            <line x1={2} x2={22} y1={12} y2={12} />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <h3 className="text-lg font-semibold">Global Ranking</h3>
                        <p className="text-sm">
                           Take a test and get Global Ranking<br></br> depending on your speed
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-4 h-10 w-10"
                        >
                            <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                            <path d="m13 12-3 5h4l-3 5" />
                        </svg>
                        <h3 className="text-lg font-semibold">
                            Fast and Efficient
                        </h3>
                        <p className="text-sm">
                            Experience lightning fast website. <br></br> Improve your speed fast.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-4 h-10 w-10"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        <h3 className="text-lg font-semibold">
                            Loved by Users
                        </h3>
                        <p className="text-sm">
                            Signup to join our community of happy users. <br></br> Track your progess through us.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutDetails;
