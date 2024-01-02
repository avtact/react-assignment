import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    
    var isAuthenticated
    if (localStorage.getItem("setUser")) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
    const location = useLocation();
    return isAuthenticated === true ? (
      children
    ) : (
        <Navigate to="/" replace state={{ path: location.pathname }} />
    );
  }