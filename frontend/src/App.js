import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default App;
