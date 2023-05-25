import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';
import '../styles/confirmation.css';

function DepositConfirmation({ closeConfirmation, deposit }) {
  const { setAddBalance } = useContext(AppContext);
  return (
    <div className="confirmation-background">
      <div className="confirmation-container">
        <div aria-labelledby="Heading" className="confirmation-title">
          <h1 id="Heading">Confirm?</h1>
        </div>
        <div className="confirmation-btn-container">
          <button
            className="confirmation-cancel-btn"
            type="button"
            onClick={() => {
              closeConfirmation();
              setAddBalance('');
            }}
          >
            Cancel
          </button>
          <button
            className="confirmation-confirm-btn"
            type="button"
            onClick={() => {
              deposit();
              setAddBalance('');
            }}
          >
            Confirm
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
