import {
    Dispatch,
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useReducer,
    useRef
} from "react";

type stateType = {
    timePassed: number;
    isTyping: boolean;
    isRunning: boolean;
    isEnd: boolean;
    currentText: string;
    typedLetters: string;
    mistakeCount: number;
    wrongCount: number;
    wpmCount: number;
    accuracy: number;
};

type stateAction =
    | { type: "set time"; payload: number }
    | { type: "set text"; payload: string }
    | { type: "set typed"; payload: string }
    | { type: "set running"; payload: boolean }
    | { type: "set end"; payload: boolean }
    | { type: "set typing"; payload: boolean }
    | { type: "set mistake"; payload: number }
    | { type: "set wrong"; payload: number }
    | { type: "set wpm"; payload: number }
    | { type: "set accuracy"; payload: number };

type contexType = {
    state: stateType;
    dispatch: Dispatch<stateAction>;
};
const initialState: stateType = {
    timePassed: 0,
    isTyping: false,
    isRunning: false,
    isEnd: false,
    currentText: "",
    typedLetters: "",
    mistakeCount: 0,
    wrongCount: 0,
    wpmCount: 0,
    accuracy: 0
};

export const timerContext = createContext<contexType>({
    state: initialState,
    dispatch: () => initialState
});

const TimerProvider = ({ children }: { children?: ReactNode }) => {
    const timeRef = useRef<NodeJS.Timeout>();
    const inputRef = useRef<HTMLInputElement>();

    function reducer(
        state: typeof initialState,
        action: stateAction
    ): stateType {
        switch (action.type) {
            case "set time": {
                return {
                    ...state,
                    timePassed: action.payload
                };
            }
            case "set text": {
                return {
                    ...state,
                    currentText: action.payload
                };
            }
            case "set typed": {
                return {
                    ...state,
                    typedLetters: action.payload
                };
            }
            case "set running": {
                return {
                    ...state,
                    isRunning: action.payload
                };
            }
            case "set end": {
                return {
                    ...state,
                    isEnd: action.payload
                };
            }
            case "set typing": {
                return {
                    ...state,
                    isTyping: action.payload
                };
            }
            case "set mistake": {
                return {
                    ...state,
                    mistakeCount: action.payload
                };
            }
            case "set wrong": {
                return {
                    ...state,
                    wrongCount: action.payload
                };
            }
            case "set wpm": {
                return {
                    ...state,
                    wpmCount: action.payload
                };
            }
            case "set accuracy": {
                return {
                    ...state,
                    accuracy: action.payload
                };
            }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const correctLetters = state.currentText.split("");
    const words = state.currentText.split(" ");

    const accuracy = useCallback(() => {
        const totalTyped = state.typedLetters.length;
        if (totalTyped) {
            return parseFloat(
                (
                    ((totalTyped - state.mistakeCount) / totalTyped) *
                    100
                ).toFixed(2)
            );
        } else {
            return 0;
        }
    }, [state.typedLetters, state.mistakeCount]);

    const wpmCalculator = useCallback(() => {
        const letterPerMinute =
            ((state.typedLetters.length - state.mistakeCount) /
                state.mistakeCount) *
            60;
        const avgWordLength = correctLetters.length / words.length;
        if (state.timePassed > 0) {
            return Math.floor(letterPerMinute / avgWordLength);
        } else {
            return 0;
        }
    }, [
        correctLetters,
        state.mistakeCount,
        state.timePassed,
        state.typedLetters,
        words
    ]);

    useEffect(() => {
        if (state.isRunning) {
            timeRef.current = setInterval(() => {
                // Store the interval reference
                dispatch({ type: "set time", payload: state.timePassed + 1 });
            }, 1000);
        } else {
            // Clear the interval if typing stops
            clearInterval(timeRef.current);
        }

        // Clear interval on unmount
        return () => {
            clearInterval(timeRef.current);
        };
    }, [state.isRunning]);

    // useEffect(() => {
    //     setPointer(typedLetters.length - 1);
    // }, [typedLetters.length]);

    function endGame() {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        dispatch({ type: "set running", payload: false });
        dispatch({ type: "set typing", payload: false });
        dispatch({ type: "set time", payload: 0 });
        clearInterval(timeRef.current);
        dispatch({ type: "set text", payload: "" });
    }

    function resetTimer() {
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
        dispatch({ type: "set running", payload: false });
        dispatch({ type: "set typing", payload: false });
        dispatch({ type: "set time", payload: 0 });
        clearInterval(timeRef.current);
        dispatch({ type: "set text", payload: "" });
        dispatch({ type: "set mistake", payload: 0 });
        dispatch({ type: "set wrong", payload: 0 });
    }
    return (
        <timerContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </timerContext.Provider>
    );
};

export default TimerProvider;
