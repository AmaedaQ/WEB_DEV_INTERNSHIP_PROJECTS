import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, allowedRoles }) {
  const auth = JSON.parse(localStorage.getItem("auth")); // Retrieve authentication data from local storage

  // Check if the user is authenticated and has the required role
  if (auth && allowedRoles.includes(auth.role)) {
    return element;
  } else {
    // Redirect to the appropriate login page based on the user's role
    const redirectPath =
      auth?.role === "employer" ? "/login/employer" : "/login/job-seeker";
    return <Navigate to={redirectPath} replace />;
  }
}

export default ProtectedRoute;
