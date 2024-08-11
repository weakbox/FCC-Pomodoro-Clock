import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerController from './TimerController';
import TimerDisplay from './TimerDisplay';

const defaultSessionLength = 25;
const defaultBreakLength = 5;

function App() {
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
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
      <TimerController 
        type="session" 
        timeLength={ sessionLength } 
        setTimeLength={ setSessionLength } 
      />
      <TimerController 
        type="break" 
        timeLength={ breakLength } 
        setTimeLength={ setBreakLength } 
      />
      <TimerDisplay 
        time={ remainingTime ? remainingTime : sessionLength * 60 } 
        startStop={ toggleTimer }
        reset={ handleReset }
      />
    </>
  );
}

export default App;