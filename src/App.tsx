import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Box, Button, Typography, Grid, Paper } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import { fetchWordleResult, type WordleRequestItem, type WordleResponse } from "./api/api";

const getCellColor = (char: string) => {
    switch (char.toLowerCase()) {
        case "g":
            return "green";
        case "y":
            return "yellow";
        default:
            return "white";
    }
};

function App() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [userInput, setUserInput] = useState("");
    const [history, setHistory] = useState<WordleRequestItem[]>([]);
    const [userInputColors, setUserInputColors] = useState<
        { letter: string; color: "green" | "yellow" | "white" }[]
    >([]);

    useEffect(() => {
        fetchWordleResult([])
            .then((response: WordleResponse) => {
                setCurrentWord(response.guess);

                setUserInputColors(
                    response.guess.split("").map((letter) => ({ letter, color: "white" })),
                );

                setInitialLoading(false);
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
        let clues = userInputColors
            .map((item) => {
                switch (item.color) {
                    case "green":
                        return "g";
                    case "yellow":
                        return "y";
                    case "white":
                    default:
                        return "x";
                }
            })
            .join("");

        try {
            const requestItem: WordleRequestItem = {
                word: currentWord,
                clue: clues,
            };

            const response = await fetchWordleResult([...history, requestItem]);

            if (clues === "ggggg") {
                alert("You've won the game!");
            } else {
                setCurrentWord(response.guess);
                setUserInput("");
                setHistory([...history, requestItem]);
                setUserInputColors(
                    response.guess.split("").map((letter) => ({ letter, color: "white" })),
                );
                // A new word is fetched, so we reset the color inputs
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

                {initialLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            py: 4,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {!initialLoading && (
                    <form onSubmit={handleSubmit}>
                        {currentWord && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" component="div" pb={2}>
                                    Wordle Bot recommends:
                                </Typography>
                                <Grid container spacing={1}>
                                    {currentWord.split("").map((letter, idx) => (
                                        <Grid item xs key={idx}>
                                            <Paper
                                                style={{
                                                    backgroundColor: getCellColor(
                                                        history.length > 0
                                                            ? history[
                                                                  history.length - 1
                                                              ].clue.charAt(idx)
                                                            : "x",
                                                    ),
                                                    minHeight: 80,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="h2">
                                                    {letter.toUpperCase()}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {history.map((item, index) => (
                            <Grid container key={index} spacing={1}>
                                {item.word.split("").map((letter, idx) => (
                                    <Grid item xs key={idx}>
                                        <Paper
                                            style={{
                                                backgroundColor: getCellColor(
                                                    item.clue.charAt(idx),
                                                ),
                                                minHeight: 80,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography variant="h2">
                                                {letter.toUpperCase()}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}

                        {currentWord && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" component="div" pb={2}>
                                    Click each letter to select the color of the result clue:
                                </Typography>
                                <Grid container spacing={1}>
                                    {currentWord.split("").map((letter, index) => (
                                        <Grid item xs key={index}>
                                            <Paper
                                                style={{
                                                    backgroundColor:
                                                        userInputColors[index]?.color || "white",
                                                    minHeight: 80,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                onClick={() => {
                                                    let color =
                                                        userInputColors[index]?.color || "white";
                                                    switch (color) {
                                                        case "white":
                                                            color = "green";
                                                            break;
                                                        case "green":
                                                            color = "yellow";
                                                            break;
                                                        case "yellow":
                                                            color = "white";
                                                            break;
                                                    }
                                                    let guessResult = [...userInputColors];
                                                    guessResult[index] = { letter, color };
                                                    setUserInputColors(guessResult);
                                                }}
                                            >
                                                <Typography variant="h2">
                                                    {letter.toUpperCase()}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                            <Button variant="contained" type="submit" disabled={loading}>
                                Submit Clues
                            </Button>
                        </Box>
                    </form>
                )}

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" color="red">
                        {error}
                    </Typography>
                </Box>
            </Container>
        </Layout>
    );
}

export default App;
