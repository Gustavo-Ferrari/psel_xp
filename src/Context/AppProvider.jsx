import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { parse, stringfy } from '../helpers';
import stocksObj from '../stocksObj';

function AppProvider({ children }) {
  const parsedBalance = parse('balance');
  const [balance, setBalance] = useState(0 || parsedBalance);
  localStorage.setItem('balance', balance || 0);

  const [openCloseEye, setOpenCloseEye] = useState(true);

  const [allStocks, setAllStocks] = useState([]);

  useEffect(() => {
    const stocks = parse('stocks');
    if (stocks) {
      setAllStocks(stocks);
    } else {
      setAllStocks(stocksObj);
      stringfy('stocks', stocksObj);
    }
  }, []);

  const [selectedStock, setSelectedStock] = useState({});

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
    ],
  );

  return <AppContext.Provider value={VALUE}>{children}</AppContext.Provider>;
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
