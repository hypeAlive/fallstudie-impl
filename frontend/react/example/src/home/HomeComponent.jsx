import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
  const navigate = useNavigate();

  const navigateToQuestion = () => {
    navigate('/question');
  };

  return (
    <button className="btn btn-active btn-primary min-w-60 mt-4" onClick={navigateToQuestion}>
      Start
    </button>
  );
};

export default HomeComponent;