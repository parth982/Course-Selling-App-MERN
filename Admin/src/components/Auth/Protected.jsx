import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // Your authentication logic here to check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    // Redirect to the homepage or login page if the user is not authenticated
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
