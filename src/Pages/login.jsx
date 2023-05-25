import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import XPlogo from '../images/xp-logo.png';
import loginData from '../validations/loginValidation';

function Login() {
  const navigate = useNavigate();
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

  useEffect(() => {
    const lastEmail = localStorage.getItem('email');
    if (lastEmail) {
      setEmail(lastEmail);
    }
  }, []);

  const loginButtonFunc = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    localStorage.setItem('lastLogin', new Date());
    navigate('/acoes');
  };

  return (
    <form onSubmit={loginButtonFunc}>
      <div className="main-container">
        <div className="login-container">
          <div className="login-card">
            <img className="xp-logo" src={XPlogo} alt="xp-logo" />
            <label htmlFor="email">
              <input
                className="email-input"
                name="email-input"
                type="email"
                id="email"
                placeholder="yourEmail.com"
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
                placeholder="Password (8 digits)"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </label>
            {isDisabled && (
              <p className="login-p">
                Enter a valid email and a password of at least 8 characters
              </p>
            )}
            <div>
              <button
                aria-labelledby="Acessar"
                className="login-btn"
                onClick={loginButtonFunc}
                disabled={isDisabled}
                name="login-button"
                type="submit"
              >
                Log in
              </button>
            </div>
            <div className="test">
              <p>
                Developt as graduation project: Work in Progress
              </p>
              <p>
                ©Gustavo Ferrari, 2022.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
