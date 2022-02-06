import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Connect from "./components/Connect";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import NFTList from "./components/NFTList";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Connect />}>
                    <Route path="" element={<MoviesList />} />
                    <Route path="details/:id" element={<MovieDetails />} />
                    <Route path="my-nfts" element={<NFTList />} />
                    <Route path="*" element={<div>Not found</div>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
