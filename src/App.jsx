import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title id="break-label">Break Length</Card.Title>
          <Card.Subtitle className="text-muted">How long will the break be?</Card.Subtitle>
          <Button id="break-decrement">-</Button>
          <div id="break-length">{breakLength}</div>
          <Button id="break-increment">+</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title id="session-label">Session Length</Card.Title>
          <Card.Subtitle className="text-muted">How long will the work be?</Card.Subtitle>
          <Button id="session-decrement">-</Button>
          <div id="session-length">{sessionLength}</div>
          <Button id="session-increment">+</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title id="timer-label">Session</Card.Title>
          <div id="time-left">mm:ss</div>
          <Button id="start-stop">Start/Stop</Button>
          <Button id="reset" className="btn-danger">Reset</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default App;
