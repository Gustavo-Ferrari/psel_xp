import React from 'react';
import { parse } from '../helpers';
import StocksTable from './StocksTable';

function MyStocks() {
  const stocks = parse('myStocks');

  return (
    <div aria-labelledby="Heading">
      <h1 id="Heading" name="myStocks" style={{ backgroundColor: 'grey', margin: '.5em', textAlign: 'center' }}>Minhas Ações</h1>
      <StocksTable stocks={stocks} isVisible="none" />
    </div>
  );
}

export default MyStocks;
