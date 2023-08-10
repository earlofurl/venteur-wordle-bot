import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

type WordGridProps = {
    word: string;
    clues: string;
    clickHandler?: (index: number) => void;
};

export const WordGrid: React.FC<WordGridProps> = ({ word, clues, clickHandler }) => {
    const getBackgroundColor = (clue: string) => {
        const value = clue ? clue.toLowerCase() : "x";

        switch (value) {
            case "g":
                return "green";
            case "y":
                return "yellow";
            default:
                return "white";
        }
    };

    return (
        <Grid container spacing={1}>
            {word.split("").map((letter, idx) => (
                <Grid item xs key={`${letter}-${idx}`}>
                    <Paper
                        elevation={1}
                        sx={{
                            minHeight: 80,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: getBackgroundColor(clues[idx]),
                            cursor: clickHandler ? "pointer" : "default",
                        }}
                        onClick={() => clickHandler?.(idx)}
                    >
                        <Typography variant="h2">{letter.toUpperCase()}</Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};
