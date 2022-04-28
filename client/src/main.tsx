import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import UserContextProvider from "@contexts/UserContext";
import SocketContextProvider from "@contexts/SocketContext";

import App from './App'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </SocketContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
