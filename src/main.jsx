import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ResultsPage from "./components/ResultsPage.jsx";
import CapabilityPage from "./components/CapabilityPage.jsx";
import ModelPage from "./components/ModelPage.jsx";
import ErrorList from "./components/ErrorList.jsx";  // ← You missed this
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/capability" element={<CapabilityPage />} />
      <Route path="/models" element={<ModelPage />} />
      <Route path="/error-list" element={<ErrorList />} />
    </Routes>
  </BrowserRouter>
);
