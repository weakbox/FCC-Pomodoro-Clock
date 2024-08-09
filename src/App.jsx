import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

const startTimer = () => {};
const stopTimer = () => {};

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  const decrementBreak = () => setBreakLength(b => b > 1 ? b - 1 : b);
  const incrementBreak = () => setBreakLength(b => b < 60 ? b + 1 : b);
 
  const decrementSession = () => setSessionLength(s => s > 1 ? s - 1 : s); 
  const incrementSession = () => setSessionLength(s => s < 60 ? s + 1 : s);

  const handleReset = () => {

  };

  const toggleTimer = () => {
    if (timerIsRunning) {
      stopTimer();
    } else {
      startTimer();
    }
    setTimerIsRunning(!timerIsRunning);
  };

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Header id="break-label">Break Length 🍵</Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between align-items-center">
          <Card.Subtitle className="text-muted mb-2">How long will the break be?</Card.Subtitle>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Button id="break-decrement" className="btn-light" onClick={decrementBreak}>-</Button>
            <h2 id="break-length" className="mx-3">{breakLength}</h2>
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
            <h2 id="session-length" className="mx-3">{sessionLength}</h2>
            <Button id="session-increment" className="btn-light" onClick={incrementSession}>+</Button>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header id="shadow-sm timer-label">Pomodoro Session 🍅</Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between align-items-center">
          <Card.Subtitle className="text-muted mb-2">This many minutes until a break!</Card.Subtitle>
          <h1 id="time-left" className="mb-2">{sessionLength}:00</h1>
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
