import { useState, useRef, useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerController from './TimerController';
import TimerDisplay from './TimerDisplay';
import AlarmSFX from './assets/alarm.mp3';


const defaultSessionLength = 25;
const defaultBreakLength = 5;
const intervalLength = 1000;

function App() {
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [remainingTime, setRemainingTime] = useState(null);
  const [timerType, setTimerType] = useState("session");

  const timerRef = useRef(null);
  const timerIsRunningRef = useRef(false);
  
  // Really strange getter and setter:
  const getIsTimerRunning = () => timerIsRunningRef.current;

  const setIsTimerRunning = (value) => {
    timerIsRunningRef.current = value;
  };

  // Watch for timer ending:
  useEffect(() => {
    if (getIsTimerRunning() && remainingTime === -1)  // Annoying -1 (off-by-one)
    {
      console.log(`Timer has reached zero!`);
      playAlarmSound();
      setTimerType(prevTimerType => prevTimerType === "session" ? "break" : "session");
    }
  }, [remainingTime]);

  // Watch for timer changing type:
  useEffect(() => {
    if (!getIsTimerRunning()) return; // Ignore on load:

    console.log(`Timer switched type! New type is: '${timerType}'`);
    setIsTimerRunning(false);
    setRemainingTime(getInitialTime());
    startTimer();
  }, [timerType]);


  const toggleTimer = () => {
    !getIsTimerRunning() ? startTimer() : pauseTimer();
  };

  const startTimer = () => {
    if (!getIsTimerRunning() && !remainingTime) {
      setRemainingTime(getInitialTime());
    }

    console.log(`Starting new timer with length '${remainingTime}'`);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleTimer, intervalLength);
    
    setIsTimerRunning(true);
  };

  const getInitialTime = () => timerType === "session"
    ? sessionLength * 60
    : breakLength * 60;

  const pauseTimer = () => { 
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    if (getIsTimerRunning()) pauseTimer();
    pauseAlarmSound();

    // Reset back to initial state (could this be done in a function?):
    setSessionLength(defaultSessionLength);
    setBreakLength(defaultBreakLength);
    setRemainingTime(null);
    setTimerType("session");
  };

  const handleTimer = () => { setRemainingTime(prevTime => prevTime >= 0 ? prevTime - 1 : prevTime) }; // Timer sticks at 00:00.

  const playAlarmSound = () => {
    const alarm = document.getElementById("beep");
    alarm.currentTime = 0;
    alarm.play().catch((error) => console.log(error));
  };

  const pauseAlarmSound = () => {
    const alarm = document.getElementById("beep");
    alarm.pause();
    alarm.currentTime = 0;
  };

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
        type={ timerType }
        startStop={ toggleTimer }
        reset={ resetTimer }
      />
      <audio id="beep" src={ AlarmSFX } />
    </>
  );
}

export default App;