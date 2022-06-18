import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Register from "./routes/Register";
import Login from "./routes/Login";
import App from "./App";
import Student from "./routes/student/Student";
import Tutor from "./routes/tutor/Tutor";
import Administrator from "./routes/administrator/Administrator";
import TopicList from "./routes/student/Topic";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/student" element={<Student />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path='/lista-tutores' element={<TopicList/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
