import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Register from "./routes/register";
import Login from "./routes/login";
import App from "./App";
import Student from "./routes/student";
import Tutor from "./routes/tutor";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/student" element={<Student />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
