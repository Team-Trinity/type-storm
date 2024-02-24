import { TypeStateContext } from "@/providers/TypeStateProvider";
import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";

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
    const { state, dispatch } = useContext(TypeStateContext);
    const mistakeRef = useRef(0);
    useEffect(() => {
        if (
            typedLetter &&
            typedLetter !== correctLetter &&
            mistakeRef.current === 0
        ) {
            mistakeRef.current = 1;
            dispatch({ type: "set mistake", payload: state.mistakeCount + 1 });
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
                                "animate-none": state.isTyping,
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
                                "animate-none": state.isTyping,
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
