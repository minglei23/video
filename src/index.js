import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './Home';
import Player from './Player';
import Profile from './Profile';
import Favorites from './Favorites';
import History from './History';
import Recommend from './Recommend';
import Video from "./video";
import Search from "./Search";
import NewSeries from "./NewSeries";
import Menu from "./Menu";

const UserContext = createContext();

function PlayerWrapper() {
  let { seriesId = 0, episode = 0 } = useParams();
  return <Player seriesId={seriesId} episode={episode} />;
}

function SearchWrapper() {
  let { searchTerm = "" } = useParams();
  return <Search searchTerm={searchTerm} />;
}

function SeriesWrapper() {
  let { seriesId = 0 } = useParams();
  return <NewSeries seriesId={seriesId} />;
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div style={{ fontFamily: 'Poppins', backgroundColor: '#111', color: 'white' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player/:seriesId/:episode" element={<PlayerWrapper />} />
            <Route path="/player/:seriesId" element={<PlayerWrapper />} />
            <Route path="/player" element={<PlayerWrapper />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/video" element={<Video />} />
            <Route path="/search/:searchTerm" element={<SearchWrapper />} />
            <Route path="/search" element={<SearchWrapper />} />
            <Route path="/series/:seriesId" element={<SeriesWrapper />} />
          </Routes>
          <Menu />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export { UserContext };
