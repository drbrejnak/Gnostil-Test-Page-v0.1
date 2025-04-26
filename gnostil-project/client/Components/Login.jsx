import { useState, useEffect } from 'react';
import { register, login, attemptLoginWithToken } from '.';
import { loginStyles } from './Styles/LoginStyles';
import Tutorial from './Tutorial';
import Cookies from 'js-cookie';

export const Login = ({ setAuth, currentUser, setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [error, setError] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    attemptLoginWithToken(setAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuth({});
    setCurrentUser(null);
    setShowLogout(false);
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough || !hasNumber) {
      setError('Password must be at least 8 characters long and contain at least 1 number.');
      return false;
    }
    return true;
  };

  const handleSubmitLogin = async (ev) => {
    ev.preventDefault();
    const success = await login(setAuth, { username, password });
    if (success) {
      setCurrentUser(username);
      setIsLoginVisible(false);
      clearInputs();
    }
  };

  const handleSubmitRegister = async (ev) => {
    ev.preventDefault();
    setError(''); // Clear any existing errors

    // Password validation
    if (!validatePassword(password)) {
      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await register(setAuth, { username, password });
    if (result.success) {
      // After successful registration, attempt login
      const loginSuccess = await login(setAuth, { username, password });
      if (loginSuccess) {
        setCurrentUser(username);
        setIsRegisterVisible(false);
        setIsLoginVisible(false);
        clearInputs();
      } else {
        setError('Registration successful but login failed. Please try logging in.');
      }
    } else {
      setError(result.error);
    }
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const cancel = () => {
    setIsLoginVisible(false);
    setIsRegisterVisible(false);
    clearInputs();
  };

  const HelpButton = () => (
    <button
      onClick={() => {
        Cookies.remove('skipTutorial');
        localStorage.setItem('tutorialManuallyOpened', 'true');
        setShowTutorial(true);
      }}
      style={{
        ...loginStyles.loginButton,
        width: '36px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
      }}
    >
      ?
    </button>
  );

  // Show username and logout option when logged in
  if (currentUser) {
    return (
      <>
        <div style={{
          ...loginStyles.loginButtonContainer,
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center'
        }}>
          <HelpButton />
          <button
            style={{...loginStyles.loginButton, cursor: 'default'}}
          >
            {currentUser}
          </button>
          <button
            onClick={handleLogout}
            style={loginStyles.logoutButton}
          >
            Logout
          </button>
        </div>
        {showTutorial && (
          <Tutorial onClose={() => setShowTutorial(false)} />
        )}
      </>
    );
  }

  if (!isLoginVisible && !isRegisterVisible) {
    return (
      <div style={{
        ...loginStyles.loginButtonContainer,
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center'
      }}>
        <HelpButton />
        <button
          onClick={() => setIsLoginVisible(true)}
          style={loginStyles.loginButton}
        >
          Login / Register
        </button>
        {showTutorial && (
          <Tutorial onClose={() => setShowTutorial(false)} />
        )}
      </div>
    );
  }

  return (
    <div style={loginStyles.loginOverlay}>
      <div style={loginStyles.loginContainer}>
        <button
          onClick={cancel}
          style={{
            ...loginStyles.closeButton,
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
        <h2 style={{ color: 'white', margin: 0, textAlign: 'center' }}>
          {isRegisterVisible ? 'Register' : 'Login'}
        </h2>
        <form
          onSubmit={isRegisterVisible ? handleSubmitRegister : handleSubmitLogin}
          style={loginStyles.loginForm}
        >
          {error && (
            <div style={{
              color: '#ff6b6b',
              textAlign: 'center',
              fontSize: '14px',
              marginBottom: '10px'
            }}>
              {error}
            </div>
          )}
          <input
            value={username}
            placeholder="Username"
            onChange={(ev) => setUsername(ev.target.value)}
            style={loginStyles.loginInput}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            style={loginStyles.loginInput}
          />
          {isRegisterVisible && (
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              style={loginStyles.loginInput}
            />
          )}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              disabled={!username || !password || (isRegisterVisible && !confirmPassword)}
              style={loginStyles.loginButton}
            >
              {isRegisterVisible ? 'Register' : 'Login'}
            </button>
          </div>
          {!isLoginVisible && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setIsLoginVisible(true);
                  setIsRegisterVisible(false);
                }}
                style={loginStyles.loginButton}
              >
                Return to Login
              </button>
            </div>
          )}
          {!isRegisterVisible && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setIsLoginVisible(false);
                  setIsRegisterVisible(true);
                }}
                style={loginStyles.loginButton}
              >
                Register
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};