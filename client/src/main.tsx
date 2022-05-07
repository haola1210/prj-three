import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import UserContextProvider from "@contexts/UserContext";
import SocketContextProvider from "@contexts/SocketContext";

import App from './App'
import MatchContextProvider from '@contexts/MatchContext';
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <UserContextProvider>
          <MatchContextProvider>
            <App />
          </MatchContextProvider>
        </UserContextProvider>
      </SocketContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
