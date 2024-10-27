// ProtectedRoute.js
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  // Show a loading screen while authentication status is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    loginWithRedirect();
    return null; // Prevent rendering protected component
  }

  return children;
};

export default ProtectedRoute;
