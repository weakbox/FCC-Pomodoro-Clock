import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function TimerDisplay({ type = "session", defaultLength = "5" }) {
  
  const convertToTimeFormat = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
  
    return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  };

  return (
    <Card>
      <Card.Header id="timer-label">Pomodoro Session 🍅</Card.Header>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Card.Subtitle className="text-muted mb-2">This many minutes until a break!</Card.Subtitle>
        <h1 id="time-left" className="mb-2">25:00</h1>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <Button id="start_stop" className="btn-primary me-1" onClick={null}>Start/Stop</Button>
          <Button id="reset" className="btn-danger ms-1" onClick={null}>Reset</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TimerDisplay;
