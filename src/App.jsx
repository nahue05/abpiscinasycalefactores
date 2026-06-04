import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Catalogo from "./pages/Catalogo.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
