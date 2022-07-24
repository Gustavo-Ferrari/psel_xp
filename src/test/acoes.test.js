import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import context from './helpers/context';
import AppContext from '../Context/AppContext';
import { Stocks } from '../Pages';
import userEvent from '@testing-library/user-event';

describe('Testa renderização no componente Stocks', () => {
  it('O HEADER deve ser renderizado', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Stocks />
      </AppContext.Provider>,['/acoes']
    );
    const saldo = screen.getByRole('heading', {
      level: 1,
      name: /saldo em conta/i,
    });
    expect(saldo).toBeInTheDocument();
  });

  it('O MyStocks deve ser renderizados', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Stocks />
      </AppContext.Provider>,['/acoes']
    );
    const myStocks = screen.getByRole('heading', {
      level: 1,
      name: /Minhas Ações/i,
    });
    expect(myStocks).toBeInTheDocument();
  });

  it('O AllStocks deve ser renderizados', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Stocks />
      </AppContext.Provider>,['/acoes']
    );
    const allStocks = screen.getByRole('heading', {
      level: 1,
      name: /Disponíveis para Investir/i,
    });
    expect(allStocks).toBeInTheDocument();
  });

  it('Testa se as ações estão na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Stocks />
      </AppContext.Provider>,['/acoes']
    );
    const stock01 = screen.getByText('CIEL3');
    const stock02 = screen.getByText('HYPE3');
    expect(stock01).toBeInTheDocument();
    expect(stock02).toBeInTheDocument();
  });

  it('Testa se os botões estão na tela de Stocks e habilitados', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Stocks />
      </AppContext.Provider>,['/acoes']
    );
    const buyBtn01 = screen.getByTestId('1');
    const buyBtn10 = screen.getByTestId('10');
    expect(buyBtn01).toBeInTheDocument();
    expect(buyBtn10).toBeInTheDocument();
    expect(buyBtn01).toBeEnabled();
    expect(buyBtn10).toBeEnabled();
  });

  it('Testa redirecionamento para tela de compras após click no botão de comprar ação', async () => {
    const { history } =  renderWithRouter(
      <AppContext.Provider value={context}>
        <Stocks />
      </AppContext.Provider>,['/acoes']
    );
    const buyBtn01 = screen.getByTestId('1');
    await userEvent.click(buyBtn01);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/comprar');
    })
  })
});
