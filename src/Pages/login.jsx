import React from 'react';

function Login() {
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
              />
            </label>
            <label htmlFor="password">
              <input
                className="password-input"
                name="password-input"
                type="password"
                id="password"
                placeholder="Senha (8 digitos)"
              />
            </label>
            <div>
              <button
                className="login-btn"
                name="login-button"
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
