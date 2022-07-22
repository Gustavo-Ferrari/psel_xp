import { screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import context from './context';
import AppContext from '../Context/AppContext';
import { Stocks, Buy } from '../Pages';

const renderStocks = () => {
  renderWithRouter(
    <AppContext.Provider value={context}>
      <Stocks />
    </AppContext.Provider>,
  );
};

describe('Testa renderização no componente Stocks', () => {
  it('O HEADER deve ser renderizado', () => {
    renderStocks();
    const saldo = screen.getByRole('heading', {
      level: 1,
      name: /saldo em conta/i,
    });
    expect(saldo).toBeInTheDocument();
  });

  it('O MyStocks deve ser renderizados', () => {
    renderStocks();
    const myStocks = screen.getByRole('heading', {
      level: 1,
      name: /Minhas Ações/i,
    });
    expect(myStocks).toBeInTheDocument();
  });

  it('O AllStocks deve ser renderizados', () => {
    renderStocks();
    const allStocks = screen.getByRole('heading', {
      level: 1,
      name: /Disponíveis para Investir/i,
    });
    expect(allStocks).toBeInTheDocument();
  });

  it('Testa se as ações estão na tela', () => {
    renderStocks();
    const stock01 = screen.getByText('CIEL3');
    const stock02 = screen.getByText('HYPE3');
    expect(stock01).toBeInTheDocument();
    expect(stock02).toBeInTheDocument();
  });

  it('Testa os botões da tela de Stocks', () => {
    renderStocks();
    const buyBtn01 = screen.getByTestId('1');
    const buyBtn10 = screen.getByTestId('10');
    expect(buyBtn01).toBeInTheDocument();
    expect(buyBtn10).toBeInTheDocument();
  });
});
