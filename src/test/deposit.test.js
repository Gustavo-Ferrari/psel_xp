import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import context from './helpers/context';
import AppContext from '../Context/AppContext';
import { DepositWithdraw } from '../Pages';

describe('Testa elementos da tela de venda', () => {
  it('O HEADER deve ser renderizado', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <DepositWithdraw />
      </AppContext.Provider>, ['/deposito']
    );
    const saldo = screen.getByRole('heading', {
      level: 1,
      name: /saldo em conta/i,
    });
    expect(saldo).toBeInTheDocument();
  });

  it('Os btns de DEPOSITO e RETIDADA devem estar na tela e desativados', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <DepositWithdraw />
      </AppContext.Provider>, ['/deposito']
    );
    const depoBtn = screen.getByRole('button', { name: /depósito/i });
    const withdrawBtn = screen.getByRole('button', { name: /retirada/i });
    expect(depoBtn).toBeInTheDocument();
    expect(withdrawBtn).toBeInTheDocument();
    expect(depoBtn).toBeDisabled();
    expect(withdrawBtn).toBeDisabled();
  });

  it('O input de quantidade de deposito deve estar na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <DepositWithdraw />
      </AppContext.Provider>, ['/deposito']
    );
    const valueInput = screen.getByRole('spinbutton');
    expect(valueInput).toBeInTheDocument();
  })

  it('O botão de compra só deve ser habilitado ao inserir um valor no input e chama função de abertura de confirmação ao clicar', async () => {
    context.setAddBalance();
    renderWithRouter(
      <AppContext.Provider value={context}>
        <DepositWithdraw />
      </AppContext.Provider>, ['/deposito']
    );
    const depoBtn = screen.getByRole('button', { name: /depósito/i });
    const withdrawBtn = screen.getByRole('button', { name: /retirada/i });
    const valueInput = screen.getByRole('spinbutton');
    await userEvent.type(valueInput, '1');
    expect(depoBtn).toBeEnabled();
    expect(withdrawBtn).toBeEnabled();
    await userEvent.click(depoBtn);
    expect(context.setOpenConfirmation).toBeCalled();
    await userEvent.click(withdrawBtn);
    expect(context.setOpenWithdrawConfirmation).toBeCalled();
  })
});
