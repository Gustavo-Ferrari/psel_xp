import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { parse } from '../helpers';

function AppProvider({ children }) {
  const parsedBalance = parse('balance');

  const [balance, setBalance] = useState(0 || parsedBalance);
  localStorage.setItem('balance', balance || 0);

  const VALUE = useMemo(
    () => ({
      balance,
      setBalance,
      parsedBalance,
    }),
    [
      balance,
      setBalance,
      parsedBalance,
    ],
  );

  return <AppContext.Provider value={VALUE}>{children}</AppContext.Provider>;
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
