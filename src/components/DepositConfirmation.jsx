import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';

function DepositConfirmation({ closeConfirmation, deposit }) {
  const { setAddBalance } = useContext(AppContext);
  return (
    <div className="confirmation-background">
      <div className="confirmation-container">
        <div className="confirmation-title">
          <h1>Deseja confirmar a operação?</h1>
        </div>
        <div className="confirmation-btn-container">
          <button className="confirmation-cancel-btn" type="button" onClick={() => { closeConfirmation(); setAddBalance(''); }}>
            Cancelar
          </button>
          <button className="confirmation-confirm-btn" type="button" onClick={() => { deposit(); setAddBalance(''); }}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepositConfirmation;

DepositConfirmation.propTypes = {
  closeConfirmation: PropTypes.func.isRequired,
  deposit: PropTypes.func.isRequired,
};
