import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from './routes';
import './App.css';
import AppContextProvider from './Context/AppContext';
import CompanyContextProvider from "./Context/CompanyContext";
import ProtectedRouteContextProvider from "./Context/ProtectedRouteContext";
import Loading from './Shared/Loading/Loading';
function App() {
  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      let element = route.children 
        ? <route.component>{renderRoutes(route.children)}</route.component>
        : <route.component />;

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
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return (
    <div className="App bg-white dark:bg-black min-h-lvh">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <AppContextProvider>
            <CompanyContextProvider> 
              <Routes>
                {renderRoutes(routes)}
              </Routes>
            </CompanyContextProvider>
          </AppContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;