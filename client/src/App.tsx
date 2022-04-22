import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import "./App.scss"


import ErrorLogger from "@components/ErrorBoundary"
import FullScreenContainer from "@components/FullScreen"
import Loading from "@components/Loading"
import UserContextProvider from "@contexts/UserContext"

const Home = lazy(() => import("@pages/Home"))

function App() {
  return (
    <div className="App">
      <ErrorLogger>
        <UserContextProvider>
          <Suspense fallback={
            <FullScreenContainer>
              <Loading />
            </FullScreenContainer>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>   
        </UserContextProvider>
      </ErrorLogger>
    </div>
  )
}

export default App
