import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import OpenFridge from './pages/fridge';
import NotFoundPage from './pages/NotFoundPage';
import { ItemContextProvider } from './context/ItemContext';
import { AuthenticationContextProvider } from './context/AuthenticationContext';



function App() {

  return (
    <AuthenticationContextProvider>
      <ItemContextProvider>
        <Router>
          <div>
            <Switch>
              <Route path = "/" exact>
                <Home />
              </Route>
              <Route path = "/fridge" exact>
                  <OpenFridge />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </ItemContextProvider>
    </AuthenticationContextProvider>
  )
}




export default App

