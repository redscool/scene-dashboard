import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { ServiceContext } from "./utils/ServiceContext";
import {
  request,
  requestFileServer,
  requestWithAccessToken,
} from "./utils/client";
import { AlertContext } from "./hooks/useAlert";
import { useState } from "react";
import Alert from "./components/Alert";

const getServiceObject = (navigate) => {
  return {
    request: request(navigate),
    requestWithAccessToken: requestWithAccessToken(navigate),
    requestFileServer: requestFileServer(navigate),
  };
};

function App() {
  const navigate = useNavigate();
  const [alert, showAlert] = useState();

  return (
    <>
      <Alert title={alert} setTitle={showAlert} />
      <ServiceContext.Provider value={getServiceObject(navigate)}>
        <AlertContext.Provider
          value={{
            alert,
            showAlert,
          }}
        >
          <Routes>
            <Route exact path="/dashboard/*" element={<Dashboard />} />
            <Route exact path="/auth/*" element={<Auth />} />
            <Route exact path="/*" element={<h1> not found app</h1>} />
          </Routes>
        </AlertContext.Provider>
      </ServiceContext.Provider>
    </>
  );
}

export default function Wrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
