import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import Header from '../components/Header';
import '../styles/deposit.css';
import DepositConfirmation from '../components/DepositConfirmation';
import WithdrawConfirmation from '../components/WithdrawConfirmation';

function DepositWithdraw() {
  const navigate = useNavigate();
  const {
    balance,
    setBalance,
    openConfirmation,
    setOpenConfirmation,
    openWithdrawConfirmation,
    setOpenWithdrawConfirmation,
    addBalance,
    setAddBalance,
  } = useContext(AppContext);

  let isDisable = false;
  let isWithdrawDisable = false;
  if (addBalance <= 0) isDisable = true;
  if (addBalance > balance || (balance && addBalance) <= 0) isWithdrawDisable = true;

  const deposit = () => {
    setBalance(balance + +addBalance);
    setAddBalance('');
    setOpenConfirmation(!openConfirmation);
  };

  const withdraw = () => {
    if ((balance < (+addBalance - 0.01))) {
      return false;
    }
    setBalance(balance - +addBalance);
    setAddBalance('');
    return setOpenWithdrawConfirmation(!openWithdrawConfirmation);
  };
  return (
    <div>
      <Header />
      <div className="deposit-btn-container">
        <button className="deposit-btn" type="button" onClick={() => setOpenConfirmation(!openConfirmation)} disabled={isDisable}>Depósito</button>
        <button className="withdraw-btn" type="button" onClick={() => setOpenWithdrawConfirmation(!openWithdrawConfirmation)} disabled={isWithdrawDisable}>
          Retirada
        </button>
      </div>
      <div className="deposit-input-container">
        <label htmlFor="deposit-input">
          <input
            id="deposit-input"
            className="deposit-input"
            value={addBalance}
            placeholder="Insira o valor"
            type="number"
            min={0}
            onChange={({ target: { value } }) => setAddBalance(value)}
          />
        </label>
      </div>
      <p className="input-text">Insira o valor e selecione a operação</p>
      <div className="goBack-btn-container">
        <button className="goBack-btn" type="button" onClick={() => navigate('/acoes')}>Voltar</button>
      </div>
      <div>
        {openWithdrawConfirmation
        && (
        <WithdrawConfirmation
          closeConfirmation={setOpenWithdrawConfirmation}
          withdraw={withdraw}
        />
        )}
        {openConfirmation
        && <DepositConfirmation closeConfirmation={setOpenConfirmation} deposit={deposit} />}
      </div>
    </div>
  );
}

export default DepositWithdraw;
