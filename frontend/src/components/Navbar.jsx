import { Link, useNavigate } from "react-router-dom";
import NotificationBell from "./Notification";
import { useAuth } from "../context/AuthContext";
import "../style.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Lesson Seasons</div>

      {user && (
        <div className="navbar-links">
          {user.role === "STUDENT" && (
            <>
              <Link to="/student">Dashboard</Link>
              <Link to="/student/lessons">Lessons</Link>
              <Link to="/student/notifications">Notifications</Link>
              <NotificationBell />
            </>
          )}

          {user.role === "INSTRUCTOR" && (
            <>
              <Link to="/instructor">Dashboard</Link>
              <Link to="/instructor/create-lesson">Create Lesson</Link>
              <Link to="/instructor/profile">Profile</Link>
            </>
          )}

          <span className="navbar-user">{user.fullName}</span>
          <button className="btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;