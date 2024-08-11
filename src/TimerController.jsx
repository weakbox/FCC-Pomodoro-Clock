import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const MAX_TIME = 60;
const MIN_TIME = 1;

const printLabel = (type) => type === "session" 
    ? "Session Length 💻" 
    : "Break Length 🍵";

function TimerController({ type, timeLength, setTimeLength }) {
  
  // Always use a function to set state when new state depends on previous state!
  const decrement = () => {
    setTimeLength(prevTimeLength => prevTimeLength > MIN_TIME 
      ? prevTimeLength - 1 
      : prevTimeLength
    );
  };

  const increment = () => {
    setTimeLength(prevTimeLength => prevTimeLength < MAX_TIME 
      ? prevTimeLength + 1 
      : prevTimeLength
    );
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header id={`${type}-label`}>{printLabel(type)}</Card.Header>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Card.Subtitle className="text-muted mb-2">{`How long will the ${type} be?`}</Card.Subtitle>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <Button id={`${type}-decrement`} className="btn-light" onClick={decrement}>-</Button>
          <h2 id={`${type}-length`} className="mb-0 mx-3">{timeLength}</h2>
          <Button id={`${type}-increment`} className="btn-light" onClick={increment}>+</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TimerController;
