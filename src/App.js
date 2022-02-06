import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MyNFTs from "./components/MyNFTs";
import Connect from "./components/Connect";
import MovieDetails from "./components/MovieDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Connect />} />
                <Route path="home" element={<Home />} />
                <Route path="details/:id" element={<MovieDetails />} />
                <Route path="my-nfts" element={<MyNFTs />} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
