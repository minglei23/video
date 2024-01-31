import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetLanguage } from './word';
import NavBar from "./components/NavBar";

const Language = () => {
  const navigate = useNavigate();
  const languages = {
    "English": "EN",
    "繁体中文": "CN",
    "Tiếng Việt": "VN",
    "แบบไทย": "TH",
    "Filipino": "TL",
    "عربي": "AE",
    "bahasa Indonesia": "ID",
    "മലേഷ്യൻ": "MS",
  }

  const handleOnBack = () => {
    navigate('/profile');
  };

  const handleClick = (value) => {
    SetLanguage(value)
    navigate('/profile');
  };

  return (
    <div className='h-full flex flex-col'>
      <NavBar title="Language" onBack={handleOnBack} />
      <div style={{ height: '4vh' }}></div>
      <div className="flex flex-col items-center justify-center">
        {Object.entries(languages).map(([key, value]) => (
          <button
            key={value}
            className="my-2 py-2 px-4 rounded text-white font-medium transition duration-150 ease-in-out transform"
            style={{ backgroundColor: '#333', width: '50%' }}
            onClick={() => handleClick(value)}
          >
            {key}
          </button>
        ))}
      </div>
      <div style={{ height: '4vh' }}></div>
    </div>
  );
};

export default Language;
