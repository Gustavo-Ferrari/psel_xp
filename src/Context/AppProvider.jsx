import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { parse, stringfy } from '../helpers';
import stocksObj from '../stocksObj';

function AppProvider({ children }) {
  const parsedBalance = parse('balance');
  const [balance, setBalance] = useState(0 || parsedBalance);
  localStorage.setItem('balance', balance || 0);

  const [myStocks, setMyStocks] = useState(parse('myStocks') || []);
  const [openCloseEye, setOpenCloseEye] = useState(true);
  const [allStocks, setAllStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState({});

  useEffect(() => {
    const stocks = parse('stocks');
    if (stocks) {
      setAllStocks(stocks);
    } else {
      setAllStocks(stocksObj);
      stringfy('stocks', stocksObj);
    }
  }, []);

  useEffect(() => {
    setMyStocks(myStocks);
    stringfy('myStocks', myStocks);
  }, [setMyStocks, myStocks]);

  const VALUE = useMemo(
    () => ({
      balance,
      setBalance,
      parsedBalance,
      openCloseEye,
      setOpenCloseEye,
      allStocks,
      setAllStocks,
      selectedStock,
      setSelectedStock,
      myStocks,
      setMyStocks,
    }),
    [
      balance,
      setBalance,
      parsedBalance,
      openCloseEye,
      setOpenCloseEye,
      allStocks,
      setAllStocks,
      selectedStock,
      setSelectedStock,
      myStocks,
      setMyStocks,
    ],
  );

  return <AppContext.Provider value={VALUE}>{children}</AppContext.Provider>;
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
