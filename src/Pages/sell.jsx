import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SellConfirmation from '../components/SellConfirmation';
import AppContext from '../Context/AppContext';
import { parse, stringfy } from '../helpers';

function Sell() {
  const navigate = useNavigate();
  const {
    selectedStock,
    setMyStocks,
    balance,
    setBalance,
    setAllStocks,
    openConfirmation,
    setOpenConfirmation,
  } = useContext(AppContext);

  const [sellQuantity, setSellQuantity] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(true);

  const authorizeTransaction = () => {
    if (selectedStock.quantidade < +sellQuantity) {
      return setIsAuthorized(false);
    }
    return setIsAuthorized(true);
  };

  const updateStock = (id, inventory) => {
    const newInventory = inventory.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          quantidade: el.quantidade + +sellQuantity,
        };
      }
      return el;
    });
    setAllStocks(newInventory);
    stringfy('stocks', newInventory);
  };

  const StockInMyAssetWallet = (stocks, id, valor, inventory) => stocks.map((el) => {
    const transactionApproved = el.id === id && el.quantidade >= +sellQuantity;
    if (transactionApproved) {
      setBalance(balance + +valor * +sellQuantity);
      updateStock(id, inventory);
      return {
        ...el,
        quantidade: el.quantidade - +sellQuantity,
      };
    }
    return el;
  });

  const sellStock = ({ id, nome, valor }) => {
    const inventory = parse('stocks');
    const foundStock = inventory.find((el) => el.id === id);
    setMyStocks((Stock) => {
      const doesExist = Stock.some((el) => el.id === id);
      if (doesExist) {
        return StockInMyAssetWallet(Stock, id, valor, inventory);
      }
      setBalance(balance + +valor * +sellQuantity);
      updateStock(id, inventory);
      return [
        ...Stock,
        {
          id,
          nome,
          quantidade: foundStock.quantidade + +sellQuantity,
          valor: +valor,
        },
      ];
    });
    if (!isAuthorized) {
      setOpenConfirmation(false);
    }
  };

  const goBack = () => {
    navigate('/acoes');
  };
  return (
    <div>
      <Header />
      <div>
        <h1 style={{ textAlign: 'center' }}>Buy/Sell Stock</h1>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Value (R$)</th>
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
          disabled={sellQuantity === '' || sellQuantity <= 0}
          className="sell-btn"
          type="button"
          onClick={() => {
            setOpenConfirmation(!openConfirmation);
            authorizeTransaction();
          }}
        >
          Sell
        </button>
        <input
          id="sell-input"
          className="sell-input"
          value={sellQuantity}
          onChange={({ target: { value } }) => setSellQuantity(value)}
          type="number"
          placeholder="Amount"
        />
      </div>
      {!isAuthorized && (
        <h2 className="notAutorized">
          It is not possible to sell more shares than is in the portfolio
        </h2>
      )}
      <div className="goBack-btn-container">
        <button
          className="goBack-btn"
          type="button"
          onClick={goBack}
        >
          Back
        </button>
      </div>
      <div>
        {openConfirmation && sellQuantity && isAuthorized && (
          <SellConfirmation
            closeConfirmation={setOpenConfirmation}
            sellStock={sellStock}
            selectedStock={selectedStock}
            setSellQuantity={setSellQuantity}
          />
        )}
      </div>
    </div>
  );
}

export default Sell;
