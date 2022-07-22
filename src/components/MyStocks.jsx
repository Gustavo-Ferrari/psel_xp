import React, { useState } from 'react';
import { parse } from '../helpers';
import StocksTable from './StocksTable';

function MyStocks() {
  const stocks = parse('myStocks');
  const [isDisabled] = useState(false);
  return (
    <div>
      <h1 name="myStocks" style={{ backgroundColor: 'grey', margin: '.5em', textAlign: 'center' }}>Minhas Ações</h1>
      <StocksTable stocks={stocks} isVisible="none" isDisabled={isDisabled} />
    </div>
  );
}

export default MyStocks;
