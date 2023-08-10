import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";

function App() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {/* Insert App here */}
            </Container>
        </Layout>
    );
}

export default App;
