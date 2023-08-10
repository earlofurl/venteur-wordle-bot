import SmartToy from "@mui/icons-material/SmartToy";
import { Box, Typography } from "@mui/material";

const Header = () => {
    return (
        <Box display="flex" justifyContent="center" pb={4}>
            <Box mt={2} display="flex" columnGap={2} alignItems="center">
                <SmartToy color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h1" color="primary">
                    Wordle Bot
                </Typography>
            </Box>
        </Box>
    );
};

export default Header;
