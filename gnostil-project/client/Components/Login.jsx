import { useState, useEffect } from 'react'
const host = "http://localhost:3000"

export const Login = ({ setAuth })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    const login = async(credentials)=> {
        try {
            const response = await fetch(`${host}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type':'application/json',
            }
            });
            const json = await response.json();

            if(response.ok){
            window.localStorage.setItem('token', json.token);
            attemptLoginWithToken();
            }
            else {
            console.log(json);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=> {
        login();},
        []);

    const attemptLoginWithToken = async()=> {
        const token = window.localStorage.getItem('token');
            if(token){
            const response = await fetch(`${host}/me`, {
                headers: {
                authorization: token
                }
            });
        const json = await response.json();
            if(response.ok){
                setAuth(json);
            }
            else {
                window.localStorage.removeItem('token');
            }
        }
    };

    useEffect(()=> {
        attemptLoginWithToken();
    }, []);

    const submit = ev => {
        ev.preventDefault();
        login({ username, password });
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