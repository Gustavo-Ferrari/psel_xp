import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
import StocksTable from './StocksTable';

function AllStocks() {
  const { allStocks } = useContext(AppContext);
  const [isDisabled] = useState(true);

  return (
    <div aria-labelledby="Heading">
      <h1
        id="Heading"
        style={{ backgroundColor: 'grey', margin: '.5em', textAlign: 'center' }}
      >
        Available
      </h1>
      <StocksTable stocks={allStocks} isDisabled={isDisabled} />
    </div>
  );
}

export default AllStocks;
