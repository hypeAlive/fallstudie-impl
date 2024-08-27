import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HomeComponent from './home/HomeComponent';
import QuestionComponent from "./question/QuestionComponent.jsx";

const App = () => {
  const [pictureUrl, setPictureUrl] = useState(null);
  const BackendPictures = {
    spring: 'src/assets/spring_logo.png',
    django: 'src/assets/django_logo.png',
    express: 'src/assets/expressjs_logo.png',
  };

  useEffect(() => {
    const fetchBackendType = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/type');
        setPictureUrl(BackendPictures[response.data.type]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBackendType();
  }, []);

  return (
    <main className="container m-auto p-4 h-lvh max-h-lvh">
      <div className="flex flex-col gap-20 justify-center items-center h-screen">
        <div className="flex justify-center items-center space-x-4">
          <img
            src="src/assets/react.svg"
            className="w-32 h-32 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            height="1200"
            width="1200"
            alt="Frontend Logo"
          />
          {pictureUrl && <h1 className="text-center text-4xl">X</h1>}
          {pictureUrl && (
            <img
              src={pictureUrl}
              className={`w-32 h-32 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] ${pictureUrl === BackendPictures.spring ? 'w-28 h-28' : ''}`}
              height="512"
              width="512"
              alt="Backend Logo"
            />
          )}
        </div>

        <div className="divider divider-primary"></div>

        <div className="flex flex-col gap-4 justify-center items-center p-6">
          <Router>
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/question" element={<QuestionComponent />} />
            </Routes>
          </Router>
        </div>
      </div>
    </main>
  );
};

export default App;