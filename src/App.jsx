import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from './routes';
import './App.css';
import AppContextProvider from './Context/AppContext';
import CompanyContextProvider from "./Context/CompanyContext";
import ProtectedRouteContextProvider from "./Context/ProtectedRouteContext";
import Loading from './Shared/Loading/Loading';

function App() {
  return (
    <div className="App bg-white dark:bg-black min-h-lvh">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <AppContextProvider>
            <CompanyContextProvider> 
              <Routes>
                {routes.map((route, index) => {
                  let element = <route.component />;

                  if (!route.public) {
                    element = (
                      <ProtectedRouteContextProvider>
                        {element}
                      </ProtectedRouteContextProvider>
                    );
                  }

                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={element}
                    />
                  );
                })}
              </Routes>
            </CompanyContextProvider>
          </AppContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;