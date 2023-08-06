import React from "react";
import StartPage from "./Pages/StartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Courses from "./components/home/Courses";
import Purchased from "./components/home/Purchased";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/Purchased" element={<Purchased />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
