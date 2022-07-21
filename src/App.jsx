import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Stocks, DepositWithdraw } from './Pages';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/acoes" element={<Stocks />} />
      <Route path="/deposito" element={<DepositWithdraw />} />
    </Routes>
  );
}

export default App;
