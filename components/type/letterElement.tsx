import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import { timerContext } from "@/providers/timerProvider";

export default function LetterElement({
    correctLetter,
    typedLetter,
    isActive,
    isLast
}: {
    typedLetter: string;
    correctLetter: string;
    isActive: boolean;
    isLast: boolean;
}) {
    // console.log(correctLetter, isLast);
    const { isTyping, mistake, setMistake } = useContext(timerContext);
    const mistakeRef = useRef(0);
    useEffect(() => {
        if (
            typedLetter &&
            typedLetter !== correctLetter &&
            mistakeRef.current === 0
        ) {
            mistakeRef.current = 1;
            setMistake((prevValue) => prevValue + 1);
        }
    });
    return (
        <>
            {typedLetter && typedLetter !== correctLetter ? (
                <span className="text-red-500 underline dark:text-red-400">
                    <span>
                        {correctLetter}
                        <span
                            className={clsx({
                                "animate-none": isTyping,
                                "animate-blinkingCursor": !isLast,
                                invisible: !isActive
                            })}
                        >
                            |
                        </span>
                    </span>
                </span>
            ) : (
                <span
                    className={`${typedLetter && correctLetter === typedLetter ? "text-green-500 dark:text-green-300" : "text-gray-500"}`}
                >
                    <span>
                        {correctLetter}
                        <span
                            className={clsx({
                                "animate-none": isTyping,
                                "animate-blinkingCursor": !isLast,
                                invisible: !isActive
                            })}
                        >
                            |
                        </span>
                    </span>
                </span>
            )}
        </>
    );
}
