const context = {
  addBalance: '',
  allStocks: [
    { id: 1, nome: 'CIEL3', quantidade: 1000, valor: 69.98 },
    { id: 2, nome: 'HYPE3', quantidade: 1000, valor: 35.99 },
    { id: 4, nome: 'SLCE3', quantidade: 1000, valor: 34.64 },
    { id: 5, nome: 'ELET6', quantidade: 1000, valor: 33.51 },
    { id: 6, nome: 'BBSE3', quantidade: 1000, valor: 24.6 },
    { id: 7, nome: 'ASAI3', quantidade: 1000, valor: 20.65 },
    { id: 8, nome: 'MULT3', quantidade: 1000, valor: 19.5 },
    { id: 9, nome: 'LVBI11', quantidade: 1000, valor: 96.82 },
    { id: 10, nome: 'CPLE6', quantidade: 1000, valor: 18.51 },
  ],
  inventory: [{ id: 1, nome: 'CIEL3', quantidade: 1000, valor: 69.98 }],
  balance: 1000,
  openCloseEye: true,
  openConfirmation: false,
  openWithdrawConfirmation: false,
  parsedBalance: 1000,
  setSelectedStock: () => {
    return { id: 1, nome: 'CIEL3', quantidade: 1000, valor: 69.98 }
  },
  setOpenConfirmation: jest.fn().mockReturnValue(true),
  setOpenWithdrawConfirmation: jest.fn().mockReturnValue(true),
  setAddBalance: () => {
    context.addBalance = context.addBalance + 1;
    console.log(context.addBalance);
  },
  selectedStock: { id: 1, nome: 'CIEL3', quantidade: 1000, valor: 69.98 },
  stocks: { id: 1, nome: 'CIEL3', quantidade: 1000, valor: 69.98 }
};

export default context;
