import useText from "@/hooks/useText";
import { cn } from "@/lib/utils";
import { TypeStateContext } from "@/providers/TypeStateProvider";
import { useContext, useRef, useState } from "react";

export default function TextSelector() {
    const { dispatch, resetTimer, inputRef } = useContext(TypeStateContext);
    const [getText] = useText();
    const [selected, setSelected] = useState(0);
    const selectorRef = useRef();

    const wordCount = [20, 40, 60, 80];
    return (
        <div className="flex items-center justify-center gap-10 text-lg">
            <h3 className="hidden font-bold md:block">Word Count :</h3>
            <div className="flex items-center justify-center gap-5 text-muted-foreground">
                {wordCount.map((count, index) => {
                    return (
                        <div
                            key={index}
                            onClick={(e) => {
                                setSelected(index);
                                dispatch({
                                    type: "set text",
                                    payload: count
                                });
                                resetTimer();
                                if (inputRef.current) {
                                    inputRef.current.focus();
                                }
                            }}
                            className={cn(
                                {
                                    "bg-muted text-foreground":
                                        index === selected
                                },
                                "cursor-pointer rounded-full px-2 py-1 font-semibold hover:text-foreground"
                            )}
                        >
                            {count}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
