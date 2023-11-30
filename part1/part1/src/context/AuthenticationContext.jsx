import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from  'axios';
const loginUrl = 'http://localhost:3002/api/login'
const userUrl = 'http://localhost:3002/api/users'

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}
const register = async (credentials) => {
  const response = await axios.post(userUrl, credentials)
  return response.data
}

const initialState = {
    authenticated: false,
    username: "",
    user: null,
    token: null
};

const AuthenticationContext = createContext({
});

const AuthenticationContextProvider = ({ children }) => {
    const [authenticated, setAuthentication] = useState(initialState.authenticated);
    const [username, setUsername] = useState(initialState.username);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(initialState.user);
    const [token, setToken] = useState(initialState.initialToken);

    const handleToken = (newToken) => {
        setToken(`Bearer ${newToken}`);
    }

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        window.localStorage.removeItem('loggedNoteappUser');
        window.location.reload();
    }

    useEffect(() => {
        if (user !== null) {
            setAuthentication(true);
        } else {
            setAuthentication(false);
        }
        console.log(user)
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          console.log(user.token)
          console.log(user)
          setUser(user)
          handleToken(user.token)
        }
        console.log("new token is " + user);
    }, [])

    const handleRegister = async (event) => {
        try {
          const user = await register({
            username, name, password
          })
          window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
          )
          handleToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          window.alert("Username exists or empty fields!")
        }
    }

    const checkLogin = async (event) => {
        try {
          const user = await login({
            username, password
          })
          window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
          ) 
          handleToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          window.alert("Wrong credentials!")
        }
      }

    return (
        <AuthenticationContext.Provider value={{
            authenticated,
            setAuthentication,
            username,
            setUsername,
            password,
            setPassword,
            checkLogin,
            handleToken,
            token,
            name,
            setName,
            handleRegister,
            user,
            handleLogout
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContextProvider.propTypes = {
    children: PropTypes.any
};

export default AuthenticationContext;

export {
    AuthenticationContextProvider
};