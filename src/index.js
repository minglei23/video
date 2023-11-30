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

const UserContext = createContext();

function PlayerWrapper() {
  let { seriesId = 0, episodeNumber = 0 } = useParams();
  return <Player seriesId={seriesId} episodeNumber={episodeNumber} />;
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:seriesId/:episodeNumber" element={<PlayerWrapper />} />
          <Route path="/player/:seriesId" element={<PlayerWrapper />} />
          <Route path="/player" element={<PlayerWrapper />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNavigation showLabels style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
          <BottomNavigationAction label="Player" icon={<PlayCircleOutlineIcon />} component={Link} to="/player/0/0" />
          <BottomNavigationAction label="Profile" icon={<PersonOutlineIcon />} component={Link} to="/profile" />
        </BottomNavigation>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export { UserContext };
