import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../renderWithRouter';
import { Login, Stocks } from '../Pages';
import App from '../App'
import context from './context'
import AppContext from '../Context/AppContext'

describe('Verifica os atributos da tela de login', () => {
  it('Verifica se o input e-mail está na tela', () => {
    Render();
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica se o input password está na tela', () => {
    Render();
    const passwordInput = screen.getByPlaceholderText('Senha (8 digitos)');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se o botão está na tela e desabilitado', () => {
    Render();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão está habilitado após o preenchimento dos campos', async () => {
    Render();
    const {
      emailInput, typedEmail, passwordInput, typedPassword, 
    } = loginCredentials();
    await userEvent.type(emailInput, typedEmail);
    await userEvent.type(passwordInput, typedPassword);
    const button = screen.getByRole('button')
    expect(button).toBeEnabled();
  });

  it('Verifica o salvamento no localStorage e redirecionamento após click no botão', async () => {
    renderApp();
    const {
      emailInput, typedEmail, passwordInput, typedPassword,
    } = loginCredentials();

    await userEvent.type(emailInput, typedEmail);
    await userEvent.type(passwordInput, typedPassword);
    const button = screen.getByRole('button')
    expect(button).toBeEnabled();
    await userEvent.click(button);
    const email = localStorage.getItem('email');
    expect(email).toEqual(typedEmail);
    const lastLogin = localStorage.getItem('lastLogin');
    expect(lastLogin).toBeTruthy();
    const saldo = screen.getByRole('heading', {level: 1, name: /saldo/i});
    expect(saldo).toBeInTheDocument()
  });
});

const loginCredentials = () => ({
  typedEmail: 'example@example.com',
  typedPassword: '12345678',
  emailInput: screen.getByRole('textbox'),
  passwordInput: screen.getByPlaceholderText('Senha (8 digitos)'),
  button: screen.findByRole('button'),
});

const Render = () => {
  renderWithRouter(<Login />);
};

const renderApp = () => {
  renderWithRouter(
  <AppContext.Provider value={context}>
    <App />
  </AppContext.Provider>
  )
}