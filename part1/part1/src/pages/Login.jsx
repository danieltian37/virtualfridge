import '.././index.css'
import '.././App.css'
import AuthenticationContext from '../context/AuthenticationContext'
import React, { createContext, useContext, useEffect, useState } from 'react';

const Login = () => {
    const authContext = useContext(AuthenticationContext);
    return (
        <>

            <div className='LoginPopup'>
                <form className='LoginForms'>
                    <label>
                    enter username: <input type='text' value = {authContext.username} onChange ={(e) => authContext.setUsername(e.target.value)} />
                    </label>
                </form>
            </div>
            
            <button className='LoginButton' onClick={() => authContext.checkLogin()}>logger inner</button>

        </>
    )
}

export default Login;