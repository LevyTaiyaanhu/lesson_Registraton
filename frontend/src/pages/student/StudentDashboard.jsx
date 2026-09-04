import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import "../../App.css";

function StudentDashboard() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [notifications, setNotifications] = useState({ upcoming: [], missed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [lessonsRes, notifRes] = await Promise.all([
        api.get("/lessons"),
        api.get("/notifications"),
      ]);
      setLessons(lessonsRes.data.data);
      setNotifications(notifRes.data.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="container">Loading dashboard...</p>;

  return (
    <div className="container">
      <h2>Welcome, {user.fullName}</h2>
      <p className="lesson-meta">Here's what's happening with your lessons.</p>

      {notifications.missed.length > 0 && (
        <div className="dashboard-alert missed">
          You missed {notifications.missed.length} lesson{notifications.missed.length > 1 ? "s" : ""}.{" "}
          <Link to="/student/notifications">View details</Link>
        </div>
      )}

      {notifications.upcoming.length > 0 && (
        <div className="dashboard-alert upcoming">
          You have {notifications.upcoming.length} upcoming lesson{notifications.upcoming.length > 1 ? "s" : ""}.
        </div>
      )}

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>{lessons.length}</h3>
          <p>Available Lesson Seasons</p>
        </div>
        <div className="summary-card">
          <h3>{notifications.upcoming.length}</h3>
          <p>Upcoming</p>
        </div>
        <div className="summary-card">
          <h3>{notifications.missed.length}</h3>
          <p>Missed</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/student/lessons" className="btn-primary">Browse Lessons</Link>
      </div>
    </div>
  );
}

export default StudentDashboard;