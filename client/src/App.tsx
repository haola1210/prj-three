import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import ErrorLogger from "@components/ErrorBoundary";
import FullScreenContainer from "@components/FullScreen";
import Loading from "@components/Loading";

import { PublicRoute, PrivateRoute } from "@routes";
import { useTerminateUser } from "./hooks";


const Home = lazy(() => import("@pages/Home"));
const Match = lazy(() => import("@pages/Match"));
const Lobby = lazy(() => import("@pages/Lobby"));
const RoomContainer = lazy(() => import("@pages/RoomContainer"));

function App() {
  useTerminateUser()
  return (
    <div className="App">
      <ErrorLogger>
        {/* <SocketContextProvider>
          <UserContextProvider> */}
            <Suspense
              fallback={
                <FullScreenContainer>
                  <Loading />
                </FullScreenContainer>
              }
            >
              <Routes>
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<Home />} />
                </Route>
                
                <Route element={<PrivateRoute />}>
                  <Route path="/match/:id" element={<Match />} />
                  <Route path="/rooms" element={<RoomContainer />} />
                  <Route path="/room/:id" element={<Lobby />} />
                </Route>
              </Routes>
            </Suspense>
          {/* </UserContextProvider>
        </SocketContextProvider> */}
      </ErrorLogger>
    </div>
  );
}

export default App;
