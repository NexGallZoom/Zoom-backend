import React from 'react';
import { io, Socket } from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

function App() {
  const socket: Socket = io('http://localhost:5000', {
    path: '/chat',
  }).connect();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
