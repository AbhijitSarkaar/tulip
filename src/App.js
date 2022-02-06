import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNFTs from "./components/MyNFTs";
import Connect from "./components/Connect";
import MovieDetails from "./components/MovieDetails";
import MoviesList from "./components/MoviesList";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Connect />}>
                    <Route path="" element={<MoviesList />} />
                    <Route path="details/:id" element={<MovieDetails />} />
                    <Route path="my-nfts" element={<MyNFTs />} />
                    <Route path="*" element={<div>Not found</div>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
