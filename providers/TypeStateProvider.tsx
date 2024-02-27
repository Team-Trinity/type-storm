import useText from "@/hooks/useText";
import {
    Dispatch,
    LegacyRef,
    MutableRefObject,
    ReactNode,
    RefObject,
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
    cpmCount: number;
    accuracy: number;
};

type stateAction =
    | { type: "set time"; payload: number }
    | { type: "increase time" }
    | { type: "set text"; payload: number }
    | { type: "set typed"; payload: string }
    | { type: "set running"; payload: boolean }
    | { type: "set end"; payload: boolean }
    | { type: "set typing"; payload: boolean }
    | { type: "set mistake"; payload: number }
    | { type: "set wrong"; payload: number }
    | { type: "set wpm"; payload: number }
    | { type: "set cpm"; payload: number }
    | { type: "set accuracy"; payload: number }
    | { type: "set end"; payload: boolean }
    | { type: "reset" };

type contexType = {
    state: stateType;
    dispatch: Dispatch<stateAction>;
    timeRef: MutableRefObject<NodeJS.Timeout | undefined>;
    inputRef: RefObject<HTMLTextAreaElement>;
    resetTimer: () => void;
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
    cpmCount: 0,
    accuracy: 0
};

export const TypeStateContext = createContext<contexType>({
    state: initialState,
    dispatch: () => initialState,
    timeRef: { current: undefined }, // Default value for MutableRefObject
    inputRef: { current: null },
    resetTimer: () => {} // Empty function as default
});

const TypeStateProvider = ({ children }: { children?: ReactNode }) => {
    const [getText] = useText();
    const timeRef = useRef<NodeJS.Timeout>();
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // const correctLetters = state.currentText.split("");
    // const words = state.currentText.split(" ");

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
            case "increase time": {
                let wrongLetter = 0;
                const correctLetters = state.currentText.split("");
                const words = state.currentText.split(" ");

                for (let i = 0; i < state.typedLetters.length; i++) {
                    if (correctLetters[i] !== state.typedLetters[i]) {
                        wrongLetter++;
                    }
                }
                const letterPerMinute =
                    ((state.typedLetters.length - wrongLetter) /
                        state.timePassed) *
                    60;
                const avgWordLength = correctLetters.length / words.length;
                let wpm = 0;
                if (state.timePassed > 0) {
                    wpm = Math.floor(letterPerMinute / avgWordLength);
                }
                return {
                    ...state,
                    timePassed: state.timePassed + 1,
                    wpmCount: wpm,
                    cpmCount: letterPerMinute
                };
            }
            case "set text": {
                return {
                    ...state,
                    currentText: getText(action.payload)
                };
            }
            case "set typed": {
                const totalTyped = state.typedLetters.length;
                let accuracy = parseFloat(
                    (
                        ((totalTyped - state.mistakeCount) / totalTyped) *
                        100
                    ).toFixed(2)
                );
                return {
                    ...state,
                    accuracy: accuracy,
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
            case "set cpm": {
                return {
                    ...state,
                    cpmCount: action.payload
                };
            }
            case "set accuracy": {
                return {
                    ...state,
                    accuracy: action.payload
                };
            }
            case "set end": {
                return {
                    ...state,
                    isEnd: action.payload
                };
            }
            case "reset": {
                clearInterval(timeRef.current);
                return {
                    ...state,
                    typedLetters : "",
                    isRunning : false,
                    isTyping : false,
                    timePassed : 0,
                    mistakeCount : 0,
                    wpmCount : 0,
                    cpmCount : 0,
                    accuracy : 0,
                    wrongCount : 0,
                    isEnd : false
                };
            }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.isRunning) {
            timeRef.current = setInterval(() => {
                // Store the interval reference
                dispatch({ type: "increase time" });
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

    function resetTimer() {
        dispatch({type : "reset"});
        
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }
    return (
        <TypeStateContext.Provider
            value={{
                state,
                dispatch,
                timeRef,
                inputRef,
                resetTimer
            }}
        >
            {children}
        </TypeStateContext.Provider>
    );
};

export default TypeStateProvider;
