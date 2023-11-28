import fridgeVector from '.././assets/fridgevector.svg'
import {Link} from 'react-router-dom';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Login from './Login.jsx'
import AuthenticationContext from '../context/AuthenticationContext';

const Home = () => {
  const authContext = useContext(AuthenticationContext);

    return (
        <>
        <div>
          <h1>virtual<br/>refrigerator</h1>
          <div target="_blank">
            { authContext.authenticated ?
              <Link to="/fridge">
                  <img src={fridgeVector} className="logo" alt="Virtual fridge logo" />
              </Link> : <>
                <Login/>
              </>
            }
          </div>
        </div>
    
        <p className="b">
          created by daniel tian
        </p>
    
      
        </>
    );
}

export default Home;