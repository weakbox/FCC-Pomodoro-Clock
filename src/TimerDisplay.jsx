import { Button, Card } from 'react-bootstrap';

const convertToTimeFormat = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
};

const printHeader = (type) => type === "session"
  ? "Pomodoro Session 🍅"
  : "Pomodoro Break 🍅";

const printSubTitle = (type) => type === "session"
  ? "This many minutes until a break!"
  : "Back to work in this many minutes!";

function TimerDisplay({ time, type, startStop, reset }) {

  return (
    <Card>
      <Card.Header id="timer-label">{ printHeader(type) }</Card.Header>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Card.Subtitle className="text-muted mb-2">{ printSubTitle(type) }</Card.Subtitle>
        <h1 id="time-left" className="mb-2">{ convertToTimeFormat(time) }</h1>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <Button id="start_stop" className="btn-primary me-1" onClick={ startStop }>Start/Pause</Button>
          <Button id="reset" className="btn-danger ms-1" onClick={ reset }>Reset</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TimerDisplay;