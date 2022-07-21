import React from 'react';
import Header from '../components/Header';
import '../styles/deposit.css';

function DepositWithdraw() {
  return (
    <div>
      <Header />
      <div className="deposit-btn-container">
        <button className="deposit-btn" type="button">Depósito</button>
        <button className="withdraw-btn" type="button">
          Retirada
        </button>
      </div>
      <div className="deposit-input-container">
        <input
          className="deposit-input"
          placeholder="Informe o valor"
          type="number"
        />
      </div>
      <div className="goBack-btn-container">
        <button className="goBack-btn" type="button">Voltar</button>
      </div>
    </div>
  );
}

export default DepositWithdraw;
