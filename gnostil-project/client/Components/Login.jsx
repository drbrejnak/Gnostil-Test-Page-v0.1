import { useState, useEffect } from 'react';
import { register, login, attemptLoginWithToken } from '.';
import { LoginStyles } from './Styles/LoginStyles';

export const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [error, setError] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    attemptLoginWithToken(setAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuth({});
    setCurrentUser(null);
    setShowLogout(false);
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
    const result = await register(setAuth, { username, password });
    if (result.success) {
      setIsRegisterVisible(false);
      setIsLoginVisible(false);
      clearInputs();
    } else {
      setError(result.error);
    }
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  };

  const cancel = () => {
    setIsLoginVisible(false);
    setIsRegisterVisible(false);
    clearInputs();
  };

  // Show username and logout option when logged in
  if (currentUser) {
    return (
      <div style={LoginStyles.loginButtonContainer}>
        <button
          onClick={() => setShowLogout(!showLogout)}
          style={LoginStyles.loginButton}
        >
          {currentUser}
        </button>
        {showLogout && (
          <button
            onClick={handleLogout}
            style={{
              ...LoginStyles.loginButton,
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              backgroundColor: 'rgba(255, 99, 99, 0.9)', // Reddish tint for logout
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: 'rgba(255, 77, 77, 0.9)',
              }
            }}
          >
            Logout?
          </button>
        )}
      </div>
    );
  }

  if (!isLoginVisible && !isRegisterVisible) {
    return (
      <div style={LoginStyles.loginButtonContainer}>
        <button
          onClick={() => setIsLoginVisible(true)}
          style={LoginStyles.loginButton}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={LoginStyles.loginOverlay}>
      <div style={LoginStyles.loginContainer}>
        <button
          onClick={cancel}
          style={{
            ...LoginStyles.closeButton,
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
          style={LoginStyles.loginForm}
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
            style={LoginStyles.loginInput}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            style={LoginStyles.loginInput}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              disabled={!username || !password}
              style={LoginStyles.loginButton}
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
                style={LoginStyles.loginButton}
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
                style={LoginStyles.loginButton}
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