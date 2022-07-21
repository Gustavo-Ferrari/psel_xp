import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Login,
  Stocks,
  DepositWithdraw,
  Buy,
  Sell,
} from './Pages';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/acoes" element={<Stocks />} />
      <Route path="/deposito" element={<DepositWithdraw />} />
      <Route path="/comprar" element={<Buy />} />
      <Route path="/vender" element={<Sell />} />
    </Routes>
  );
}

export default App;
