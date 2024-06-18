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

const getServiceObject = (navigate) => {
  return {
    request: request(navigate),
    requestWithAccessToken: requestWithAccessToken(navigate),
    requestFileServer: requestFileServer(navigate),
  };
};

function App() {
  const navigate = useNavigate();
  return (
    <ServiceContext.Provider value={getServiceObject(navigate)}>
      <Routes>
        <Route exact path="/dashboard/*" element={<Dashboard />} />
        <Route exact path="/auth/*" element={<Auth />} />
        <Route exact path="/*" element={<h1> not found app</h1>} />
      </Routes>
    </ServiceContext.Provider>
  );
}

export default function Wrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
