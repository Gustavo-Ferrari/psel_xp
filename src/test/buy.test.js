import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import context from './helpers/context';
import AppContext from '../Context/AppContext';
import { Buy } from '../Pages';
import * as helpers from '../helpers';

describe('Testa elementos da tela de compra', () => {
  it('O HEADER deve ser renderizado', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
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
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
    );
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Comprar/Vender Ação',
    });
    expect(title).toBeInTheDocument();
  });

  it('O botão de compra deve estar na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
    );
    const buyBtn = screen.getByRole('button', { name: /comprar/i });
    expect(buyBtn).toBeInTheDocument();
  });

  it('O botão de voltar deve estar na tela e ao ser clicado deve retornar a tela de acoes', async () => {
    const { history } = renderWithRouter(
      <AppContext.Provider value={context}>
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
    );
    const goBackBtn = screen.getByRole('button', { name: /voltar/i });
    expect(goBackBtn).toBeInTheDocument();
    await userEvent.click(goBackBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/acoes')
    });
  });

  it('O input de quantidade de compra deve estar na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
    );
    const valueInput = screen.getByRole('spinbutton');
    expect(valueInput).toBeInTheDocument();
  });

  it('Os dados da ação selecionada deve estar na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
    );
    const stockName = screen.getByRole('cell', { name: /ciel3/i });
    const stockQtd = screen.getByRole('cell', { name: /1000/i });
    const stockPrice = screen.getByRole('cell', { name: /69\.98/i });
    expect(stockName).toBeInTheDocument();
    expect(stockQtd).toBeInTheDocument();
    expect(stockPrice).toBeInTheDocument();
  });

  it('O botão de compra só deve ser habilitado ao inserir um valor no input', async () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
    );
    const buyBtn = screen.getByRole('button', { name: /comprar/i });
    expect(buyBtn).toBeDisabled();
    const valueInput = screen.getByRole('spinbutton');
    await userEvent.type(valueInput, '1');
    expect(buyBtn).toBeEnabled();
  });

  it('Ao clicar no botão de comprar, deve chamar a função de abertura de confirmação de compra', async () => {
    const mockedParse = jest
    .spyOn(helpers, 'parse')
    .mockReturnValue(context.inventory);
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Buy />
      </AppContext.Provider>,
      ['/comprar'],
      );
    const buyBtn = screen.getByRole('button', { name: /comprar/i });
    const valueInput = screen.getByRole('spinbutton');
    await userEvent.type(valueInput, '1');
    await userEvent.click(buyBtn);
    expect(mockedParse).toBeCalledWith('stocks');
    expect(context.setOpenConfirmation).toBeCalled();
    mockedParse.mockRestore();
  });
});
