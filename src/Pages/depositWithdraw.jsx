import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../Context/AppContext';
import '../styles/deposit.css';

function DepositWithdraw() {
  const navigate = useNavigate();
  const {
    balance,
    setBalance,
    addBalance,
    setAddBalance,
  } = useContext(AppContext);

  let isDisable = false;
  let isWithdrawDisable = false;
  if (balance && addBalance <= 0) isDisable = true;
  if (addBalance > balance || (balance && addBalance) <= 0) isWithdrawDisable = true;

  const deposit = () => {
    setBalance(balance + +addBalance);
    setAddBalance('');
  };

  const withdraw = () => {
    if ((balance < (+addBalance - 0.01))) {
      return false;
    }
    return setBalance(balance - +addBalance);
  };

  return (
    <div>
      <Header />
      <div className="deposit-btn-container">
        <button className="deposit-btn" type="button" onClick={deposit} disabled={isDisable}>Depósito</button>
        <button className="withdraw-btn" type="button" onClick={withdraw} disabled={isWithdrawDisable}>
          Retirada
        </button>
      </div>
      <div className="deposit-input-container">
        <input
          className="deposit-input"
          placeholder="Informe o valor"
          type="number"
          value={addBalance}
          onChange={({ target: { value } }) => setAddBalance(value)}
        />
      </div>
      <div className="goBack-btn-container">
        <button className="goBack-btn" type="button" onClick={() => navigate('/acoes')}>Voltar</button>
      </div>
    </div>
  );
}

export default DepositWithdraw;
