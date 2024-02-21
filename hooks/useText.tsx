import { faker } from "@faker-js/faker";

export default function useText() {
    function getText(length: number) {
        return faker.word.words({ count: length });
    }

    return [getText];
}
