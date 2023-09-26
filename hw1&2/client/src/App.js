import React from 'react';
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar';
import Genre from './components/genre';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route element={<Genre />} path={"/genres"}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;