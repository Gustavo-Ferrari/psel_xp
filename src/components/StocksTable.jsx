import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import '../styles/stocksTable.css';

function StocksTable({ stocks, isVisible, isDisabled }) {
  const navigate = useNavigate();
  const { setSelectedStock, balance } = useContext(AppContext);

  const buy = (stock) => {
    setSelectedStock(stock);
    navigate('/comprar');
  };
  const sell = (stock) => {
    setSelectedStock(stock);
    navigate('/vender');
  };

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
                    data-testid={stock.id}
                    type="button"
                    className="table-buy-btn"
                    disabled={balance < stock.valor || stock.quantidade <= 0}
                    onClick={() => buy(stock)}
                  >
                    C
                  </button>
                  <button
                    type="button"
                    className="table-sell-btn"
                    disabled={stock.quantidade === 0 || isDisabled}
                    onClick={() => sell(stock)}
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
          onClick={() => navigate('/deposito')}
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
      id: PropTypes.number,
    }),
  ),
  isVisible: PropTypes.string,
  isDisabled: PropTypes.bool,
};
StocksTable.defaultProps = { stocks: [] };
StocksTable.defaultProps = { isVisible: '' };
StocksTable.defaultProps = { isDisabled: false };
