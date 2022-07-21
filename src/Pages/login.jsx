import React, { useEffect, useState } from 'react';
import loginData from '../validations/loginValidation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const validateLogin = async () => {
      const userData = {
        email,
        password,
      };
      const isValid = await loginData.isValid(userData);
      if (isValid) {
        setIsDisabled(false);
      } else setIsDisabled(true);
    };
    validateLogin();
  }, [email, password]);

  return (
    <form>
      <div className="main-container">
        <div className="login-container">
          <div className="login-card">
            <label htmlFor="email">
              <input
                className="email-input"
                name="email-input"
                type="email"
                id="email"
                placeholder="seuEmail.com"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </label>
            <label htmlFor="password">
              <input
                className="password-input"
                name="password-input"
                type="password"
                id="password"
                placeholder="Senha (8 digitos)"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </label>
            <div>
              <button
                className="login-btn"
                name="login-button"
                disabled={isDisabled}
                type="submit"
              >
                Acessar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
