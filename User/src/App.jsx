import React from "react";
import StartPage from "./Pages/StartPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Courses from "./components/home/Courses";
import Purchased from "./components/home/Purchased";
import CourseInfo from "./components/home/CourseInfo";
import CartMenu from "./components/global/CartMenu";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailure from "./Pages/PaymentFailure";
import AuthStore from "./state/AuthStore";

const App = () => {
  const { isLogged } = AuthStore();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/courses"
          element={isLogged ? <Courses /> : <Navigate to="/" />}
        />
        <Route
          path="/courses/:id"
          element={isLogged ? <CourseInfo /> : <Navigate to="/" />}
        />
        <Route
          path="/Purchased"
          element={isLogged ? <Purchased /> : <Navigate to="/" />}
        />
        <Route
          path="/stripeSuccess"
          element={isLogged ? <PaymentSuccess /> : <Navigate to="/" />}
        />
        <Route
          path="/stripeFailure"
          element={isLogged ? <PaymentFailure /> : <Navigate to="/" />}
        />
      </Routes>
      <CartMenu />
    </BrowserRouter>
  );
};

export default App;
