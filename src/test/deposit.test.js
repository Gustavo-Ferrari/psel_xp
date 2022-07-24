import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import context from './helpers/context';
import AppContext from '../Context/AppContext';
import { DepositWithdraw } from '../Pages';
const renderDepositPage = () => {

  renderWithRouter(
    <AppContext.Provider value={context}>
      <DepositWithdraw />
    </AppContext.Provider>, ['/deposito']
  );
};

describe('Testa elementos da tela de venda', () => {
  it('O HEADER deve ser renderizado', () => {
    renderDepositPage();
    const saldo = screen.getByRole('heading', {
      level: 1,
      name: /saldo em conta/i,
    });
    expect(saldo).toBeInTheDocument();
  });

  it('Os btns de DEPOSITO e RETIDADA devem estar na tela e desativados', () => {
    renderDepositPage();
    const depoBtn = screen.getByRole('button', { name: /depósito/i });
    const withdrawBtn = screen.getByRole('button', { name: /retirada/i });
    expect(depoBtn).toBeInTheDocument();
    expect(withdrawBtn).toBeInTheDocument();
    expect(depoBtn).toBeDisabled();
    expect(withdrawBtn).toBeDisabled();
  });
});
