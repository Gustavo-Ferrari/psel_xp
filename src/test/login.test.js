import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../../renderWithRouter';
import { Login } from '../Pages';

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

  // it('Verifica o salvamento no localStorage após click no botão', () => {
  //   Render();
  //   const {
  //     emailInput, typedEmail, passwordInput, typedPassword, button,
  //   } = loginCredentials();

  //   userEvent.type(emailInput, typedEmail);
  //   userEvent.type(passwordInput, typedPassword);
  //   expect(button).toBeEnabled();
  //   userEvent.click(button);
  //   const email = Object.values(localStorage);
  //   expect(Object.keys(localStorage)).toEqual(['email']);
  //   expect(email).toEqual([typedEmail]);
  // });
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
