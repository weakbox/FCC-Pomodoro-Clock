import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerController from './TimerController';
import TimerDisplay from './TimerDisplay';

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

  const playAlarmSound = () => {};

  return (
    <>
      <TimerController type="session" defaultLength="25" />
      <TimerController type="break" defaultLength="5" />
      <TimerDisplay />
    </>
  );
}

export default App;
