import React from 'react';
import MyStocks from '../components/MyStocks';
import AllStocks from '../components/AllStocks';
import Header from '../components/Header';

function Stocks() {
  return (
    <div>
      <Header />
      <MyStocks />
      <AllStocks />
    </div>
  );
}

export default Stocks;
