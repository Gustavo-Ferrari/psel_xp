import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import AppContext from '../Context/AppContext';

function Buy() {
  const { selectedStock } = useContext(AppContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/acoes');
  };

  return (
    <div>
      <Header />
      <div>
        <h1>Comprar/Vender Ação</h1>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ação</th>
                <th>Qtde</th>
                <th>Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedStock.id}>
                <td className="stock-name">{selectedStock.nome}</td>
                <td className="stock-qtd">{selectedStock.quantidade}</td>
                <td className="stock-value">{selectedStock.valor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="btn-input-container">
        <button
          className="buy-btn"
          type="button"
        >
          Comprar
        </button>
        <input
          className="buy-input"
          type="number"
          placeholder="Digite a quantidade"
        />
      </div>
      <div className="goBack-btn-container">
        <button className="goBack-btn" type="button" onClick={goBack}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Buy;
