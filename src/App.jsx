import { useState, useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

const convertToTimeFormat = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
};

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  // Always use a function to set state when new state depends on previous state!
  const decrementBreak = () => {
    setBreakLength(prevBreakLength => prevBreakLength > 1 
      ? prevBreakLength - 1 
      : prevBreakLength
    );
  };

  const incrementBreak = () => {
    setBreakLength(prevBreakLength => prevBreakLength < 60 
      ? prevBreakLength + 1 
      : prevBreakLength
    );
  };

  const decrementSession = () => {
    setSessionLength(prevSessionLength => prevSessionLength > 1 
      ? prevSessionLength - 1 
      : prevSessionLength
    );
  };

  const incrementSession = () => {
    setSessionLength(prevSessionLength => prevSessionLength < 60 
      ? prevSessionLength + 1 
      : prevSessionLength
    );
  };

  const handleReset = () => {
    if (remainingTime) { stopTimer(); }
    setBreakLength(5);
    setSessionLength(25);
  };

  const toggleTimer = () => {
    if (intervalId) { pauseTimer(); } 
    else { startTimer(); }
  };

  const startTimer = () => {
    if (!remainingTime) {
      setRemainingTime(sessionLength * 60);
    }
    setIntervalId(setInterval(handleTimer, 100));
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleTimer = () => {
    setRemainingTime((prevTime) => {
      console.log(prevTime)
      if (prevTime <= 0) {
        playAlarmSound();
        stopTimer();
        return;
      }
      return prevTime - 1;
    });
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setRemainingTime(null);
  };

  const displayRemainingTime = () => {
    // Display session length if the timer is not active:
    return remainingTime ? convertToTimeFormat(remainingTime) : sessionLength.toString().padStart(2, 0) + ":00";
  };

  const playAlarmSound = () => {};

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Header id="break-label">Break Length 🍵</Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between align-items-center">
          <Card.Subtitle className="text-muted mb-2">How long will the break be?</Card.Subtitle>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Button id="break-decrement" className="btn-light" onClick={decrementBreak}>-</Button>
            <h2 id="break-length" className="mb-0 mx-3">{breakLength}</h2>
            <Button id="break-increment" className="btn-light" onClick={incrementBreak}>+</Button>
          </div>
        </Card.Body>
      </Card>
      <Card className="shadow-sm mb-4">
        <Card.Header id="session-label">Session Length 💻</Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between align-items-center">
          <Card.Subtitle className="text-muted mb-2">How long will the work be?</Card.Subtitle>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Button id="session-decrement" className="btn-light" onClick={decrementSession}>-</Button>
            <h2 id="session-length" className="mb-0 mx-3">{sessionLength}</h2>
            <Button id="session-increment" className="btn-light" onClick={incrementSession}>+</Button>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header id="timer-label">Pomodoro Session 🍅</Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between align-items-center">
          <Card.Subtitle className="text-muted mb-2">This many minutes until a break!</Card.Subtitle>
          <h1 id="time-left" className="mb-2">{displayRemainingTime()}</h1>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Button id="start_stop" className="btn-primary me-1" onClick={toggleTimer}>Start/Stop</Button>
            <Button id="reset" className="btn-danger ms-1" onClick={handleReset}>Reset</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default App;
