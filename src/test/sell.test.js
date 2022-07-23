import { screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import context from './context';
import AppContext from '../Context/AppContext';
import { Sell } from '../Pages';

const renderBuyPage = () => {
  renderWithRouter(
    <AppContext.Provider value={context}>
      <Sell />
    </AppContext.Provider>,
  );
};

describe('Testa elementos da tela de venda', () => {
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

  it('O botão de venda deve estar na tela', () => {
    renderBuyPage();
    const sellBtn = screen.getByRole('button', { name: /vender/i });
    expect(sellBtn).toBeInTheDocument();
  });

  it('O botão de voltar deve estar na tela', () => {
    renderBuyPage();
    const goBackBtn = screen.getByRole('button', { name: /voltar/i });
    expect(goBackBtn).toBeInTheDocument();
  });

  it('O input de quantidade de venda deve estar na tela', () => {
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
