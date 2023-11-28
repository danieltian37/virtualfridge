import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    authenticated: false,
    username: ""
};

const AuthenticationContext = createContext({
});

const AuthenticationContextProvider = ({ children }) => {
    const [authenticated, setAuthentication] = useState(initialState.authenticated);
    const [username, setUsername] = useState(initialState.username);

    const checkLogin = () => {
        if (username === "daniel") {
            setAuthentication(!authenticated);
        } else {
            window.alert("invalid username!");
        }
    }

    return (
        <AuthenticationContext.Provider value={{
            authenticated,
            setAuthentication,
            username,
            setUsername,
            checkLogin,
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