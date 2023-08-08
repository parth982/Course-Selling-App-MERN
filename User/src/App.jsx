import React from "react";
import StartPage from "./Pages/StartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Courses from "./components/home/Courses";
import Purchased from "./components/home/Purchased";
import CourseInfo from "./components/home/CourseInfo";
import CartMenu from "./components/global/CartMenu";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseInfo />} />
        <Route path="/Purchased" element={<Purchased />} />
      </Routes>
      <CartMenu />
    </BrowserRouter>
  );
};

export default App;
