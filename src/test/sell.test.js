import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import context from './helpers/context';
import AppContext from '../Context/AppContext';
import { Sell } from '../Pages';
import * as helpers from '../helpers';

describe('Testa elementos da tela de venda', () => {
  it('O HEADER deve ser renderizado', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const saldo = screen.getByRole('heading', {
      level: 1,
      name: /saldo em conta/i,
    });
    expect(saldo).toBeInTheDocument();
  });

  it('O TITULO da página deve estar presente', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Comprar/Vender Ação',
    });
    expect(title).toBeInTheDocument();
  });

  it('O botão de venda deve estar na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const sellBtn = screen.getByRole('button', { name: /vender/i });
    expect(sellBtn).toBeInTheDocument();
  });

  it('O botão de voltar deve estar na tela e ao ser clicado deve retornar a tela de acoes', async () => {
    const { history } = renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const goBackBtn = screen.getByRole('button', { name: /voltar/i });
    expect(goBackBtn).toBeInTheDocument();
    await userEvent.click(goBackBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/acoes');
    });
  });

  it('O input de quantidade de venda deve estar na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const valueInput = screen.getByRole('spinbutton');
    expect(valueInput).toBeInTheDocument();
  });

  it('Os dados da ação selecionada deve estar na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const stockName = screen.getByRole('cell', { name: /ciel3/i });
    const stockQtd = screen.getByRole('cell', { name: /1000/i });
    const stockPrice = screen.getByRole('cell', { name: /69\.98/i });
    expect(stockName).toBeInTheDocument();
    expect(stockQtd).toBeInTheDocument();
    expect(stockPrice).toBeInTheDocument();
  });

  it('O botão de venda só deve ser habilitado ao inserir um valor no input', async () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const sellBtn = screen.getByRole('button', { name: /vender/i });
    expect(sellBtn).toBeDisabled();
    const valueInput = screen.getByRole('spinbutton');
    await userEvent.type(valueInput, '1');
    expect(sellBtn).toBeEnabled();
  });

  it('Ao clicar no botão de vender, deve chamar a função de abertura de confirmação de venda', async () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Sell />
      </AppContext.Provider>,
      ['/vender'],
    );
    const sellBtn = screen.getByRole('button', { name: /vender/i });
    const valueInput = screen.getByRole('spinbutton');
    await userEvent.type(valueInput, '1');
    await userEvent.click(sellBtn);
    expect(context.setOpenConfirmation).toBeCalled();
  });
});
