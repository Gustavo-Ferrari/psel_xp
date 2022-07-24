import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function BuyConfirmation({ closeConfirmation, buyStock, selectedStock }) {
  const navigate = useNavigate();
  const goBack = () => {
    setTimeout(() => {
      navigate('/acoes');
    }, 1);
  };
  return (
    <div className="confirmation-background">
      <div className="confirmation-container">
        <div aria-labelledby="Heading" className="confirmation-title">
          <h1 id="Heading">Deseja confirmar a operação?</h1>
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
              closeConfirmation();
              goBack();
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
