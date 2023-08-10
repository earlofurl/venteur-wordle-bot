export type WordleRequestItem = {
    word: string;
    clue: string;
};

export type WordleRequest = WordleRequestItem[];

export type WordleResponse = {
    guess: string;
};

const API_PATH = "https://interviewing.venteur.co/api/wordle";

const isWordleResponse = (responseObject: unknown): responseObject is WordleResponse => {
    const response = responseObject as WordleResponse;
    return (
        response !== undefined && typeof response === "object" && typeof response.guess === "string"
    );
};

export const fetchWordleResult = async (request: WordleRequest): Promise<WordleResponse> => {
    const bodyValue = JSON.stringify(request);
    const options = {
        method: "POST",
        body: bodyValue,
    };
    try {
        var response = await fetch(API_PATH, options);
        if (response.status >= 200 && response.status < 300) {
            const output = await response.json();
            if (isWordleResponse(output)) {
                return output;
            } else {
                throw new Error(`Unexpected response: ${JSON.stringify(output)}`);
            }
        } else {
            const error = await response.text();
            throw new Error(error);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
