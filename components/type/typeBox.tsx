"use client";

import useText from "@/hooks/useText";
import { cn } from "@/lib/utils";
import { TypeStateContext } from "@/providers/TypeStateProvider";
import {
    ChevronRight,
    MousePointerClick,
    RefreshCw,
    RotateCcw,
    Trophy
} from "lucide-react";
import { Inter, Roboto_Condensed } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import Letter from "./letterElement";
import TextSelector from "./textSelector";
import axios from "axios";
import { AuthContext } from "@/providers/AuthProvider";

const roboto_condensed = Roboto_Condensed({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function TypeBox() {
    const [initialUserData, setInitialUserData] = useState<user>();
    const { user } = useContext(AuthContext);
    const { state, dispatch, inputRef, resetTimer } =
        useContext(TypeStateContext);

    const [isOverlay, setIsOverlay] = useState(false);

    const [getText] = useText();
    // useEffect(()=> {
    //     user && axios.get(`https://type-storm-server-one.vercel.app/api/v1/users/data?email=${user.email}`).then(response => {
    //         setInitialUserData(response?.data)
    //         console.log(response?.data);
    //     }).catch(error => {
    //         console.log("initial data from typeBox: >>>", error);
    //     } )

    // },[user])
    // useEffect(()=> {
    //     if(state.isEnd && user && initialUserData){
    //         const data: user = {
    //             email: user.email as string, wpmRecords: [...initialUserData?.wpmRecords, state.wpmCount], accuracyRecords: [...initialUserData?.accuracyRecords, state.accuracy], cpmRecords: [...initialUserData?.cpmRecords, state.cpmCount]
    //         }
    //         axios.post(`https://type-storm-server-one.vercel.app/api/v1/users/${user.email}/wpm-accuracy-records`, data)
    //     }
    // },[state.isEnd])

    useEffect(() => {
        dispatch({ type: "set text", payload: 20 });
    }, []);

    useEffect(() => {
        if (state.isRunning) {
            let typingTimer: NodeJS.Timeout;

            // Function to handle typing start
            const handleTypingStart = () => {
                dispatch({ type: "set typing", payload: true });
            };

            // Function to handle typing end
            const handleTypingEnd = () => {
                dispatch({ type: "set typing", payload: false });
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    // Reset after 8 seconds of no typing
                    console.log("User stopped typing for 8 seconds.");
                    resetHandler();
                }, 5000);
            };

            // Event listeners for typing start and end
            document.addEventListener("keydown", handleTypingStart);
            document.addEventListener("keyup", handleTypingEnd);

            return () => {
                document.removeEventListener("keydown", handleTypingStart);
                document.removeEventListener("keyup", handleTypingEnd);
                clearTimeout(typingTimer);
            };
        }
    }, [state.isRunning]); // Empty dependency array to ensure the effect runs only once

    function changeHandler(value: string) {
        // Dirty code here. Some issue with useState not syncing properly thats why had to +1 the typed.length
        if (state.typedLetters.length + 1 >= state.currentText.length) {
            dispatch({ type: "set running", payload: false });
            dispatch({ type: "set end", payload: true });
        } else if (state.typedLetters.length > 0 && !state.isRunning) {
            dispatch({ type: "set running", payload: true });
        }

        console.log(value);
        dispatch({ type: "set typed", payload: value });
        console.log("TYPED", value);
        console.log("TYPING....", state.isTyping);
    }

    function resetHandler() {
        setTimeout(() => {
            resetTimer();
        }, 0);
    }
    function nextHandler() {
        dispatch({
            type: "set text",
            payload: state.currentText.split(" ").length
        });
        setTimeout(() => {
            resetTimer();
        }, 0);
    }

    return (
        <div className="mx-auto flex w-[calc(100vw*0.7)] flex-col items-center justify-center gap-5 transition-all">
            <TextSelector />
            <div className="grid w-full grid-cols-2 items-center justify-center gap-2">
                <div className="row-span-2 w-full text-center text-5xl">
                    {state.timePassed}
                    <span className="text-lg"> s</span>
                </div>
                <div className="flex w-full flex-col items-center justify-around">
                    <div className="text-center text-2xl">
                        {state.wpmCount}
                        <span className="text-lg"> WPM</span>
                    </div>
                    <div className="text-center text-2xl">
                        {state.accuracy}%{" "}
                        <span className="text-lg">accuracy</span>
                    </div>
                </div>
            </div>
            <Progress
                value={
                    (state.typedLetters.length * 100) / state.currentText.length
                }
                className="my-2 h-1"
            />
            <div
                className={cn(
                    "relative min-h-80 w-full text-wrap p-5 text-3xl font-normal leading-[3.5rem] tracking-tighter transition-all",
                    roboto_condensed.className
                    // { "border border-red-200": isTyping }
                )}
            >
                <span
                    className={cn(
                        {
                            "animate-blinkingCursor":
                                !state.isTyping && state.isRunning,
                            invisible: state.typedLetters.length !== 0
                        },
                        "-z-50"
                    )}
                >
                    |
                </span>
                <span className="-z-50 transition-all">
                    {state.currentText.split("").map((letter, index) => {
                        return (
                            <Letter
                                key={index}
                                correctLetter={letter}
                                typedLetter={state.typedLetters[index]}
                                isActive={
                                    state.typedLetters.length - 1 === index
                                }
                                isLast={index === state.currentText.length - 1}
                            />
                        );
                    })}
                </span>
                <textarea
                    autoFocus
                    onFocus={() => setIsOverlay(false)}
                    onBlur={() =>
                        state.currentText.length > 0 && setIsOverlay(true)
                    }
                    //disable various interactions on input box
                    onCopy={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    onCut={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    onPaste={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    // onSelect={(e) => {
                    //     e.preventDefault();
                    //     return false;
                    // }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    // onDrag={(e) => {
                    //     e.preventDefault();
                    //     return false;
                    // }}
                    autoComplete="false"
                    contextMenu="false"
                    draggable="false"
                    tabIndex={-1}
                    maxLength={state.currentText.length}
                    ref={inputRef}
                    disabled={
                        state.typedLetters.length > 1 &&
                        // Check if the last typed letter is correct or not then disable it
                        state.typedLetters.slice(-1) ===
                            state.currentText.slice(-1) &&
                        !state.isRunning
                    }
                    name="type-input"
                    className="absolute left-0 top-0 z-50 h-full w-full select-none opacity-0"
                    onChange={(e) => changeHandler(e.target.value)}
                />
                {/* Focus loss overlay */}
                {isOverlay && (
                    <div
                        className={cn(
                            "absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-5 text-4xl opacity-100 backdrop-blur-sm transition-all",
                            inter.className
                        )}
                    >
                        <MousePointerClick size={64} />
                        <h2>Click here to type</h2>
                    </div>
                )}
                {/* End Screen */}
                {state.typedLetters.length === state.currentText.length &&
                    state.timePassed > 0 && (
                        <div
                            className={cn(
                                "absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-start text-5xl backdrop-blur-md transition-all",
                                inter.className
                            )}
                        >
                            <Trophy className="mb-5 mt-2 " size={90} />
                            <div className="text-center text-6xl">
                                {state.wpmCount}
                                <span className="text-3xl"> WPM</span>
                            </div>
                            {/* <div className="row-span-2 w-full text-center text-4xl">
                                {state.timePassed}
                                <span className="text-xl"> s</span>
                            </div> */}
                            <div className="text-center text-5xl">
                                {state.accuracy}%{" "}
                                <span className="text-3xl">accuracy</span>
                            </div>
                        </div>
                    )}
                {/* Loading Skeleton */}
                {state.currentText.length === 0 && (
                    <div
                        className={cn(
                            "absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center text-xl backdrop-blur-md transition-all",
                            inter.className
                        )}
                    >
                        <RefreshCw size={90} className="animate-spin" />
                    </div>
                )}
            </div>
            <div className="flex w-full items-center justify-center gap-20">
                <div className="flex flex-col items-center justify-center gap-1">
                    <RotateCcw
                        onClick={resetHandler}
                        className="cursor-pointer "
                    />
                    <h3 className="text-sm">Restart</h3>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <ChevronRight
                        onClick={nextHandler}
                        className="cursor-pointer "
                    />
                    <h3 className="text-sm">Next</h3>
                </div>
            </div>
        </div>
    );
}
