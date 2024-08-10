import { useState, useEffect } from 'react';
import './App.scss';
import TimerController from './TimerController';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

const convertToTimeFormat = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
};

function App() {
  const [intervalId, setIntervalId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

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

  // const displayRemainingTime = () => {
  //   // Display session length if the timer is not active:
  //   return remainingTime ? convertToTimeFormat(remainingTime) : sessionLength.toString().padStart(2, 0) + ":00";
  // };

  const playAlarmSound = () => {};

  return (
    <>
      <TimerController type="session" defaultLength="25" />
      <TimerController type="break" defaultLength="5" />
      <Card>
        <Card.Header id="timer-label">Pomodoro Session 🍅</Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between align-items-center">
          <Card.Subtitle className="text-muted mb-2">This many minutes until a break!</Card.Subtitle>
          <h1 id="time-left" className="mb-2">{}</h1>
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
