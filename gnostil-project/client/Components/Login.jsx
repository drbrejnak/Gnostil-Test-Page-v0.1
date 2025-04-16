import { useState, useEffect } from 'react'
import { login, attemptLoginWithToken } from '.';

export const Login = ({ setAuth })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    useEffect(()=> {
        const credentials = { username, password };
        login(setAuth, credentials);
    },[]);

    useEffect(()=> {
        attemptLoginWithToken(setAuth);
    }, []);

    const submit = ev => {
        ev.preventDefault();
        login(setAuth, { username, password });
    }

    const logout = ev => {
        ev.preventDefault();
        window.localStorage.removeItem('token');
        setAuth({});
    };

  return (
    <form onSubmit={submit}>
      <input value={ username } placeholder='username' onChange={ ev=> setUsername(ev.target.value)}/>
      <input value={ password} placeholder='password' onChange={ ev=> setPassword(ev.target.value)}/>
      <button disabled={ !username || !password }>Login</button>
      <button onClick={logout}>Logout</button>
    </form>
  );
}