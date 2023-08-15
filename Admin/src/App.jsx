import React from "react";
import StartPage from "./Pages/StartPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Courses from "./components/home/Courses";
import AddCourse from "./components/home/AddCourse";
import UpdCourse from "./components/home/UpdCourse";
import AuthStore from "./state/AuthStore";

const App = () => {
  const { isLogged } = AuthStore();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/AddCourse"
          element={isLogged ? <AddCourse /> : <Navigate to="/" />}
        />
        <Route
          path="/courses"
          element={isLogged ? <Courses /> : <Navigate to="/" />}
        />
        <Route
          path="/courses/:courseId"
          element={isLogged ? <UpdCourse /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
