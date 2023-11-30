import '.././index.css'
import '.././App.css'
import AuthenticationContext from '../context/AuthenticationContext'
import React, { createContext, useContext, useEffect, useState } from 'react';

const LoginPage = () => {
    const authContext = useContext(AuthenticationContext);
    return (
        <>

            <div className='LoginPopup'>
                <form className='LoginForms'>
                    <label>
                    enter username: <input type='text' value = {authContext.username} onChange ={(e) => authContext.setUsername(e.target.value)} />
                    </label>
                </form>
                <form className='LoginForms'>
                    <label>
                    enter password: <input type='password' value = {authContext.password} onChange ={(e) => authContext.setPassword(e.target.value)} />
                    </label>
                </form>
            </div>
            
            <button className='LoginButton' onClick={() => authContext.checkLogin()}>logger inner</button>

        </>
    )
}

const RegisterPage = () => {
    const authContext = useContext(AuthenticationContext);
    return (
        <>

            <div className='LoginPopup'>
                <form className='LoginForms'>
                    <label>
                    enter username: <input type='text' value = {authContext.username} onChange ={(e) => authContext.setUsername(e.target.value)} />
                    </label>
                </form>
                <form className='LoginForms'>
                    <label>
                    enter name: <input type='text' value = {authContext.name} onChange ={(e) => authContext.setName(e.target.value)} />
                    </label>
                </form>
                <form className='LoginForms'>
                    <label>
                    enter password: <input type='password' value = {authContext.password} onChange ={(e) => authContext.setPassword(e.target.value)} />
                    </label>
                </form>
            </div>
            
            <button className='RegisterButton' onClick={() => authContext.handleRegister()}>registerer</button>

        </>
    )
}


const Login = () => {
    const [showMain, setShowMain] = useState(true);
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);

    const selectLogIn = () => {
        setShowMain(false);
        setLoginVisible(true);
    }
    const selectRegister = () => {
        setShowMain(false);
        setRegisterVisible(true);
    }
    const cancel = () => {
        setShowMain(true);
        setLoginVisible(false);
        setRegisterVisible(false);
    }

    return (
        <>
            { showMain ? 
            <>
                <button onClick = {selectLogIn} className='selectLogin'>
                    Log in
                </button>
                <button onClick = {selectRegister} className='selectRegister'>
                    Register
                </button>
            </> :
             <>
              { loginVisible ?
              <>
              <LoginPage/> 
                <button onClick = {cancel} className='cancelL'>
                    Cancel
               </button>
               </>:
               <><RegisterPage/> 
                <button onClick = {cancel} className='cancelR'>
                    Cancel
               </button></>}
             </>
            } 
        </>
    )
}

/**
 *             { showMain ? 
            <>
                <button onClick = {selectLogIn}>
                    Log in
                </button>
                <button onClick = {selectRegister}>
                    Register
                </button>
            </> :
             <>
              { loginVisible ?
              <LoginPage/> :
               <RegisterPage/> }
             </>
            } 
 */

export default Login;