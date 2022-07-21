import React from 'react';
import PropTypes from 'prop-types';

function SellConfirmation({
  closeConfirmation,
  sellStock,
  selectedStock,
  setSellQuantity,
}) {
  return (
    <div className="confirmation-background">
      <div className="confirmation-container">
        <div className="confirmation-title-container">
          <h1 className="confirmation-title">Deseja confirmar a operação?</h1>
        </div>
        <div className="confirmation-btn-container">
          <button
            className="confirmation-cancel-btn"
            type="button"
            onClick={() => { closeConfirmation(); setSellQuantity(''); }}
          >
            Cancelar
          </button>
          <button
            className="confirmation-confirm-btn"
            type="button"
            onClick={() => {
              sellStock(selectedStock);
              setSellQuantity('');
            }}
          >
            Confirmar
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
