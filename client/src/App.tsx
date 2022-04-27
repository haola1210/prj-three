import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import ErrorLogger from "@components/ErrorBoundary";
import FullScreenContainer from "@components/FullScreen";
import Loading from "@components/Loading";
import UserContextProvider from "@contexts/UserContext";

const Home = lazy(() => import("@pages/Home"));
const Match = lazy(() => import("@pages/Match"));
const Lobby = lazy(() => import("@pages/Lobby"));
const Room = lazy(() => import("@pages/Room"));

function App() {
  return (
    <div className="App">
      <ErrorLogger>
        <UserContextProvider>
          <Suspense
            fallback={
              <FullScreenContainer>
                <Loading />
              </FullScreenContainer>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/match/:id" element={<Match />} />
              <Route path="/room" element={<Room />} />
              <Route path="/room/:id" element={<Lobby />} />
            </Routes>
          </Suspense>
        </UserContextProvider>
      </ErrorLogger>
    </div>
  );
}

export default App;
