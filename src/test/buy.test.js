import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import context from './helpers/context';
import AppContext from '../Context/AppContext';
import { Buy } from '../Pages';

const renderBuyPage = () => {
  renderWithRouter(
    <AppContext.Provider value={context}>
      <Buy />
    </AppContext.Provider>, ['/comprar']
  );
};

describe('Testa elementos da tela de compra', () => {
  it('O HEADER deve ser renderizado', () => {
    renderBuyPage();
    const saldo = screen.getByRole('heading', {
      level: 1,
      name: /saldo em conta/i,
    });
    expect(saldo).toBeInTheDocument();
  });

  it('O TITULO da página deve estar presente', () => {
    renderBuyPage();
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Comprar/Vender Ação',
    });
    expect(title).toBeInTheDocument();
  });

  it('O botão de compra deve estar na tela', () => {
    renderBuyPage();
    const buyBtn = screen.getByRole('button', { name: /comprar/i });
    expect(buyBtn).toBeInTheDocument();
  });

  it('O botão de voltar deve estar na tela', () => {
    renderBuyPage();
    const goBackBtn = screen.getByRole('button', { name: /voltar/i });
    expect(goBackBtn).toBeInTheDocument();
  });

  it('O input de quantidade de compra deve estar na tela', () => {
    renderBuyPage();
    const valueInput = screen.getByRole('spinbutton');
    expect(valueInput).toBeInTheDocument();
  });

  it('Os dados da ação selecionada deve estar na tela', () => {
    renderBuyPage();
    const stockName = screen.getByRole('cell', { name: /ciel3/i });
    const stockQtd = screen.getByRole('cell', { name: /1000/i });
    const stockPrice = screen.getByRole('cell', { name: /69\.98/i });
    expect(stockName).toBeInTheDocument();
    expect(stockQtd).toBeInTheDocument();
    expect(stockPrice).toBeInTheDocument();
  });
});
