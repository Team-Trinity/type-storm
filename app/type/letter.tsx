import clsx from "clsx";
import { cn } from "../_lib/utils";

export default function Letter({
    correctLetter,
    typedLetter,
    isActive,
    isTyping
}: {
    typedLetter: string;
    correctLetter: string;
    isActive: boolean;
    isTyping: boolean;
}) {
    return (
        <>
            {typedLetter && typedLetter !== correctLetter ? (
                <span
                    className={cn({
                        "text-red-400":
                            correctLetter && typedLetter !== correctLetter,
                        underline:
                            correctLetter && typedLetter !== correctLetter
                    })}
                >
                    <span>
                        {correctLetter}
                        <span
                            className={clsx({
                                "animate-blinkingCursor": !isTyping,
                                invisible: !isActive
                            })}
                        >
                            |
                        </span>
                    </span>
                </span>
            ) : (
                <span
                    className={`${isActive ? "text-white" : typedLetter && correctLetter === typedLetter ? "text-green-300" : "text-gray-500"}`}
                >
                    <span>
                        {correctLetter}
                        <span
                            className={clsx({
                                "animate-blinkingCursor": !isTyping,
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
