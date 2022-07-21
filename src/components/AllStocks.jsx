import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
import StocksTable from './StocksTable';

function AllStocks() {
  const { allStocks } = useContext(AppContext);
  const [isDisabled] = useState(true);

  return (
    <div>
      <h1 style={{ backgroundColor: 'grey', margin: '.5em', textAlign: 'center' }}>Disponíveis para Investir</h1>
      <StocksTable stocks={allStocks} isDisabled={isDisabled} />
    </div>
  );
}

export default AllStocks;
