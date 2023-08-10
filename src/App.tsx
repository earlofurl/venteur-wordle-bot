import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { fetchWordleResult, type WordleRequestItem, type WordleResponse } from "./api/api";
import { WordGrid } from "./components/WordGrid";

function App() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentGuess, setCurrentGuess] = useState("");
    const [history, setHistory] = useState<WordleRequestItem[]>([]);
    const [userClueInput, setUserClueInput] = useState<string>("");

    // Function to cycle through the clue colors.
    const handleGuessInputChange = (idx: number) => {
        const cluesArr = userClueInput.split("");
        const currentClue = cluesArr[idx];

        const clueKeys = {
            x: "y",
            y: "g",
            g: "x",
        };
        cluesArr[idx] = clueKeys[currentClue as keyof typeof clueKeys];

        setUserClueInput(cluesArr.join(""));
    };

    // Initial fetch of the first word
    useEffect(() => {
        fetchWordleResult([])
            .then((response: WordleResponse) => {
                setCurrentGuess(response.guess);
                setInitialLoading(false);
                setUserClueInput("xxxxx");
                setLoading(false);
            })
            .catch((unknownError) => {
                if (unknownError instanceof Error) {
                    setError(`Failed to fetch initial word. ${unknownError.message}`);
                    console.error(unknownError);
                    setInitialLoading(false);
                    setLoading(false);
                }
            });
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        try {
            const requestItem: WordleRequestItem = {
                word: currentGuess,
                clue: userClueInput,
            };

            const response = await fetchWordleResult([...history, requestItem]);

            if (userClueInput === "ggggg") {
                alert("You've won the game!");
            } else {
                setCurrentGuess(response.guess);
                setHistory([...history, requestItem]);
                // A new word is fetched, so we reset the color inputs
                // TODO: Set the userClueInput to the previous guess's clue
                setUserClueInput("xxxxx");
            }
        } catch (unknownError) {
            if (unknownError instanceof Error) {
                setError(`Failed to fetch next word. ${unknownError.message}`);
                console.error(unknownError);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />

                {/* Initial loading state indicator */}
                {initialLoading && (
                    <Box display="flex" py={4} justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                )}

                {!initialLoading && (
                    <form onSubmit={handleSubmit}>
                        {/* Current Guess Display */}
                        {currentGuess && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" component="div" pb={2}>
                                    Wordle Bot recommends your next guess is:
                                </Typography>
                                <WordGrid
                                    word={currentGuess}
                                    clues={
                                        history.length > 0 ? history[history.length - 1].clue : ""
                                    }
                                />
                            </Box>
                        )}

                        {/* History */}
                        <Container sx={{ pb: 2 }}>
                            {history.map((item, idx) => (
                                <Box
                                    mt={2}
                                    p={2}
                                    border={1}
                                    borderRadius="borderRadius"
                                    borderColor="grey.500"
                                    key={`${item.word}-${idx}`}
                                >
                                    <Typography variant="h6" component="div" pb={2}>
                                        Guess {idx + 1}
                                    </Typography>
                                    <WordGrid
                                        key={`${item.word}-${idx}`}
                                        word={item.word}
                                        clues={item.clue}
                                    />
                                </Box>
                            ))}
                        </Container>

                        {/* Guess Input */}
                        {currentGuess && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" component="div" pb={2}>
                                    Click each letter to select clue colors:
                                </Typography>
                                <WordGrid
                                    word={currentGuess}
                                    clues={userClueInput}
                                    clickHandler={handleGuessInputChange}
                                />
                            </Box>
                        )}

                        {/* Submit Button */}
                        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                            {loading && <CircularProgress />}
                            <Button variant="contained" type="submit" disabled={loading}>
                                Submit Clues
                            </Button>
                        </Box>
                    </form>
                )}

                {/* Error Display */}
                <Box mt={2}>
                    <Typography variant="body1" color="red">
                        {error}
                    </Typography>
                </Box>
            </Container>
        </Layout>
    );
}

export default App;
