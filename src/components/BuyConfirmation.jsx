import React from 'react';
import PropTypes from 'prop-types';

function BuyConfirmation({
  closeConfirmation,
  buyStock,
  selectedStock,

}) {
  return (
    <div className="confirmation-background">
      <div className="confirmation-container">
        <div className="confirmation-title">
          <h1>Deseja confirmar a operação?</h1>
        </div>
        <div className="confirmation-btn-container">
          <button
            className="confirmation-cancel-btn"
            type="button"
            onClick={() => {
              closeConfirmation();
            }}
          >
            Cancelar
          </button>
          <button
            className="confirmation-confirm-btn"
            type="button"
            onClick={() => {
              buyStock(selectedStock);
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyConfirmation;

BuyConfirmation.propTypes = {
  closeConfirmation: PropTypes.func.isRequired,
  buyStock: PropTypes.func.isRequired,
  selectedStock: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
    valor: PropTypes.number.isRequired,
  }).isRequired,
};
