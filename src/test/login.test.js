import { screen, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { Login } from '../Pages';
import App from '../App';
import context from './helpers/context';
import AppContext from '../Context/AppContext';

const loginCredentials = () => ({
  typedEmail: 'example@example.com',
  typedPassword: '12345678',
  emailInput: screen.getByRole('textbox'),
  passwordInput: screen.getByPlaceholderText('Senha (8 digitos)'),
});

describe('Verifica os atributos da tela de login', () => {
  it('Verifica se o input e-mail está na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Login />
      </AppContext.Provider>,
      ['/'],
    );
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica se o input password está na tela', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Login />
      </AppContext.Provider>,
      ['/'],
    );
    const passwordInput = screen.getByPlaceholderText('Senha (8 digitos)');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se o botão está na tela e desabilitado', () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Login />
      </AppContext.Provider>,
      ['/'],
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão está habilitado após o preenchimento dos campos', async () => {
    renderWithRouter(
      <AppContext.Provider value={context}>
        <Login />
      </AppContext.Provider>,
      ['/'],
    );
    const { emailInput, typedEmail, passwordInput, typedPassword } =
      loginCredentials();
    await userEvent.type(emailInput, typedEmail);
    await userEvent.type(passwordInput, typedPassword);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('Verifica o salvamento no localStorage e redirecionamento após click no botão', async () => {
        const { history } = renderWithRouter(
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>,
      ['/'],
      );

    const { emailInput, typedEmail, passwordInput, typedPassword } = loginCredentials();
    await userEvent.type(emailInput, typedEmail);
    await userEvent.type(passwordInput, typedPassword);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    await userEvent.click(button);
    const email = localStorage.getItem('email');
    expect(email).toEqual(typedEmail);
    const lastLogin = localStorage.getItem('lastLogin');
    expect(lastLogin).toBeTruthy();
    await waitFor(() => {
      expect(history.location.pathname).toBe('/acoes')
    })
  });
});
