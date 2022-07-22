import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import XPlogo from '../images/xp-logo.png';
import '../styles/header.css';

function Header() {
  const {
    balance, parsedBalance, openCloseEye, setOpenCloseEye,
  } = useContext(AppContext);
  const toBRL = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance);

  const openClose = () => setOpenCloseEye(!openCloseEye);

  return (
    <div className="header-container">
      <div className="user-container">
        <Link to="/">
          <img className="xp-logo-header" src={XPlogo} alt="xp-logo" />
        </Link>
        <p className="user-p">{`Usuário: ${localStorage.getItem('email')}`}</p>
      </div>
      <div className="balance-container">
        <div className="eye-btn-container">
          <button className="eye-btn" onClick={openClose} type="button">
            👁 Saldo
          </button>
        </div>
        {openCloseEye && (
          <h1 className="balance-p">
            {parsedBalance === null
              ? 'Saldo em conta: R$ 0'
              : `Saldo em conta: ${toBRL}`}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Header;
