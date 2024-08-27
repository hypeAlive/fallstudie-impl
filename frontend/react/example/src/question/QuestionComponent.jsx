import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuestionComponent.css';

const QuestionComponent = () => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIds, setQuestionIds] = useState([]);

  const BackendPictures = {
    spring: 'src/assets/spring_logo.png',
    django: 'src/assets/django_logo.png',
    express: 'src/assets/expressjs_logo.png',
  };

  useEffect(() => {
    const fetchQuestionIds = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/question/ids');
        setQuestionIds(response.data);
        requestRandomQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestionIds();
  }, []);

  const requestRandomQuestions = async (ids) => {
    setIsLoading(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setIsCorrect(null);

    try {
      const randomId = ids[Math.floor(Math.random() * ids.length)];
      const response = await axios.get(`http://localhost:8080/api/question/${randomId}`);
      setQuestion(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onOptionSelected = (option) => {
    setSelectedAnswer(option.type);
  };

  const submitAnswer = async () => {
    if (!selectedAnswer || !question) return;

    const checkId = question.id;
    setQuestion(null);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/question', {
        id: checkId,
        answer: selectedAnswer,
      });
      setIsCorrect(response.data.isCorrect);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <span className="loading loading-spinner text-secondary"></span>
      ) : (
        <div>
          {question ? (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
              <div className="flex flex-col gap-2">
                {question.options.map((option) => (
                  <label className="flex items-center gap-2" key={option.type}>
                    <input
                      type="radio"
                      name="radio-3"
                      className="radio radio-secondary"
                      value={option}
                      onClick={() => onOptionSelected(option)}
                    />
                    <span>{`${option.type}) ${option.text}`}</span>
                  </label>
                ))}
              </div>
              <button
                className={`btn btn-active btn-primary min-w-60 mt-4 hover:bg-primary-dark ${!selectedAnswer ? 'btn-disabled' : ''}`}
                onClick={submitAnswer}
              >
                Bestätigen
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className={`text-2xl font-bold mb-4 result ${isCorrect === false ? 'wrong' : ''}`}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </h2>
              <button
                className="btn btn-active btn-primary min-w-60 mt-4 hover:bg-primary-dark"
                onClick={() => requestRandomQuestions(questionIds)}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;