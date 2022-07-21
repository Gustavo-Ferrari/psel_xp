import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import AppContext from '../Context/AppContext';
import { parse, stringfy } from '../helpers';

function Buy() {
  const {
    selectedStock,
    setMyStocks,
    balance,
    setBalance,
    setAllStocks,
  } = useContext(AppContext);
  const [buyQuantity, setBuyQuantity] = useState('');
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/acoes');
  };

  const updateStock = (id, inventory) => {
    const newInventory = inventory.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          quantidade: el.quantidade - +buyQuantity,
        };
      }
      return el;
    });
    setAllStocks(newInventory);
    stringfy('stocks', newInventory);
  };

  const StockInMyAssetWallet = (stocks, id, valor, foundStock, inventory) => stocks.map((el) => {
    const transactionApproved = el.id === id && balance >= +valor * +buyQuantity
        && foundStock.quantidade >= +buyQuantity;
    if (transactionApproved) {
      setBalance(balance - +valor * +buyQuantity);
      updateStock(id, inventory);
      return {
        ...el,
        quantidade: el.quantidade + +buyQuantity,
      };
    }
    return el;
  });

  const buyStock = ({ id, nome, valor }) => {
    const inventory = parse('stocks');
    const foundStock = inventory.find((el) => el.id === id);
    setMyStocks((Stock) => {
      const doesExist = Stock.some((el) => el.id === id);
      if (doesExist) {
        return StockInMyAssetWallet(Stock, id, valor, foundStock, inventory);
      }
      setBalance(balance - +valor * +buyQuantity);
      updateStock(id, inventory);
      return [
        ...Stock,
        {
          id,
          nome,
          quantidade: +buyQuantity,
          valor: +valor,
        },
      ];
    });
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
          value={buyQuantity}
          onChange={({ target: { value } }) => setBuyQuantity(value)}
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
