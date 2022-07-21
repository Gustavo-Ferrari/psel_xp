import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Stocks } from './Pages';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/acoes" element={<Stocks />} />
    </Routes>
  );
}

export default App;
