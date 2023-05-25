import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyConfirmation from '../components/BuyConfirmation';
import Header from '../components/Header';
import AppContext from '../Context/AppContext';
import { parse, stringfy } from '../helpers';
import '../styles/buySellTable.css';

function Buy() {
  const {
    selectedStock,
    setMyStocks,
    balance,
    setBalance,
    openConfirmation,
    setOpenConfirmation,
    setAllStocks,
  } = useContext(AppContext);

  const [buyQuantity, setBuyQuantity] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [funds, setFunds] = useState(true);

  const navigate = useNavigate();

  const verifyFunds = ({ valor }) => {
    if (balance < +valor * +buyQuantity) {
      return setFunds(false);
    }
    return setFunds(true);
  };

  const authorizeTransaction = ({ id }) => {
    const inventory = parse('stocks');
    const foundStock = inventory.find((el) => el.id === id);
    if (foundStock.quantidade < +buyQuantity) {
      return setIsAuthorized(false);
    }
    return setIsAuthorized(true);
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
    const transactionApproved = el.id === id
        && balance >= +valor * +buyQuantity
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
    setOpenConfirmation(true);
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
                <th>Price (R$)</th>
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
          disabled={buyQuantity === '' || buyQuantity <= 0}
          className="buy-btn"
          type="button"
          onClick={() => {
            setOpenConfirmation(!openConfirmation);
            authorizeTransaction(selectedStock);
            verifyFunds(selectedStock);
          }}
        >
          Buy
        </button>
        <input
          id="buy-input"
          className="buy-input"
          value={buyQuantity}
          onChange={({ target: { value } }) => setBuyQuantity(value)}
          type="number"
          placeholder="Amount"
        />
      </div>
      {!funds && <h2 className="notAutorized">Insufficient funds</h2>}
      {!isAuthorized && (
        <h2 className="notAutorized">
          It is not possible to buy shares above the available stock
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
        {openConfirmation && buyQuantity && isAuthorized && funds && (
          <BuyConfirmation
            updateStock={updateStock}
            closeConfirmation={setOpenConfirmation}
            buyStock={buyStock}
            selectedStock={selectedStock}
          />
        )}
      </div>
    </div>
  );
}

export default Buy;
