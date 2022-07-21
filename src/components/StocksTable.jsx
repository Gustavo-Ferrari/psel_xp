import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import AppContext from '../Context/AppContext';

function StocksTable({ stocks, isDisabled, isVisible }) {
  const { balance } = useContext(AppContext);

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr className="table-header-rows">
              <th>Ação</th>
              <th>Qtde</th>
              <th>Valor (R$)</th>
              <th>Negociar</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {stocks && stocks.map((stock) => (
              <tr className="table-body-rows" key={stock.id}>
                <td className="action-name">{stock.nome}</td>
                <td className="action-qtd">{stock.quantidade}</td>
                <td className="action-value">{stock.valor}</td>
                <td className="table-btns-container">
                  <button
                    type="button"
                    className="table-buy-btn"
                    disabled={balance < stock.valor}
                  >
                    C
                  </button>
                  <button
                    type="button"
                    className="table-sell-btn"
                    disabled={isDisabled}
                  >
                    V
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="deposit-withdraw-btn-container">
        <button
          className="deposit-withdraw-btn"
          type="button"
          style={{ display: isVisible }}
        >
          Depósito/Retirada
        </button>
      </div>
    </>
  );
}

export default StocksTable;

StocksTable.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isVisible: PropTypes.string,
};
StocksTable.defaultProps = { isVisible: '' };
