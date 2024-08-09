import { useState } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <Alert variant="primary">Check out my button!</Alert>
      <Button>Test Button</Button>
    </div>
  )
}

export default App
