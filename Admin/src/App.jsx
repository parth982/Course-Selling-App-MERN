import React from "react";
import StartPage from "./Pages/StartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Courses from "./components/home/Courses";
import AddCourse from "./components/home/AddCourse";
import UpdCourse from "./components/home/UpdCourse";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/AddCourse" element={<AddCourse />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<UpdCourse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
