import { generate, count } from "random-words";

export default function useText() {
    function getText(length: number) {
        const wordArray = generate(length) as string[];
        console.log(wordArray);
        return wordArray.join(" ");
    }

    return [getText];
}
