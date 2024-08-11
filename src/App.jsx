import { useState, useRef } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerController from './TimerController';
import TimerDisplay from './TimerDisplay';

const defaultSessionLength = 25;
const defaultBreakLength = 5;
const intervalLength = 1000;

function App() {
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [remainingTime, setRemainingTime] = useState(null);

  const timerRef = useRef(null);

  const handleReset = () => {
    if (remainingTime) stopTimer();
    setSessionLength(defaultSessionLength);
    setBreakLength(defaultBreakLength);
  };

  const toggleTimer = () => {
    if (remainingTime) pauseTimer(); 
    else startTimer();
  };

  const startTimer = () => {
    if (!remainingTime) setRemainingTime(sessionLength * 60);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleTimer, intervalLength);
  };

  const pauseTimer = () => clearInterval(timerRef.current);
  
  const handleTimer = () => {
    setRemainingTime((prevTime) => {
      console.log("prevTime", prevTime);
      if (prevTime <= 0) {
        // playAlarmSound();
        stopTimer();
        return 0;
      }
      return prevTime - 1;
    });
  };

  const stopTimer = () => {
    console.log("Stop the timer!");
    clearInterval(timerRef.current);
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
        time={ remainingTime !== null ? remainingTime : sessionLength * 60 } 
        startStop={ toggleTimer }
        reset={ handleReset }
      />
    </>
  );
}

export default App;