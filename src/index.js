import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Home from './Home';
import Player from './Player';
import Profile from './Profile';
import Favorites from './Favorites';
import History from './History';
import Recommend from './Recommend';
import Video from "./video";

const UserContext = createContext();

function PlayerWrapper() {
  let { seriesId = 0, episode = 0 } = useParams();
  return <Player seriesId={seriesId} episode={episode} />;
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div style={{ backgroundColor: 'black', color: 'white' }}>
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
          </Routes>
          <BottomNavigation showLabels style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'black', color: 'white', borderTop: 'none', boxShadow: 'none' }}>
            <BottomNavigationAction label="Home" style={{ color: 'white' }} icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction label="Recommend" style={{ color: 'white' }} icon={<PlayCircleOutlineIcon />} component={Link} to="/recommend" />
            <BottomNavigationAction label="Profile" style={{ color: 'white' }} icon={<PersonOutlineIcon />} component={Link} to="/profile" />
          </BottomNavigation>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export { UserContext };
