import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function SellConfirmation({
  closeConfirmation,
  sellStock,
  selectedStock,
  setSellQuantity,
}) {
  const navigate = useNavigate();
  const goBack = () => {
    setTimeout(() => {
      navigate('/acoes');
    }, 1);
  };
  return (
    <div className="confirmation-background">
      <div className="confirmation-container">
        <div aria-labelledby="Heading" className="confirmation-title-container">
          <h1 id="Heading" className="confirmation-title">Confirm?</h1>
        </div>
        <div className="confirmation-btn-container">
          <button
            className="confirmation-cancel-btn"
            type="button"
            onClick={() => {
              closeConfirmation();
              setSellQuantity('');
            }}
          >
            Cancel
          </button>
          <button
            className="confirmation-confirm-btn"
            type="button"
            onClick={() => {
              sellStock(selectedStock);
              setSellQuantity('');
              closeConfirmation();
              goBack();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellConfirmation;

SellConfirmation.propTypes = {
  closeConfirmation: PropTypes.func.isRequired,
  sellStock: PropTypes.func.isRequired,
  setSellQuantity: PropTypes.func.isRequired,
  selectedStock: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
    valor: PropTypes.number.isRequired,
  }).isRequired,
};
