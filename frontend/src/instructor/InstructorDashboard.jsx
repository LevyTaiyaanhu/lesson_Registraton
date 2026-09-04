import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "../App.css";

function InstructorDashboard() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      const res = await api.get("/lessons");
      setLessons(res.data.data);
    } catch (err) {
      console.error("Failed to load lessons", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="container">Loading dashboard...</p>;

  const totalStudents = lessons.reduce((sum, l) => sum + l.joinedCount, 0);

  return (
    <div className="container">
      <h2>Welcome, {user.fullName}</h2>
      <p className="lesson-meta">Manage your lesson seasons and track registrations.</p>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>{lessons.length}</h3>
          <p>Lesson Seasons</p>
        </div>
        <div className="summary-card">
          <h3>{totalStudents}</h3>
          <p>Total Registrations</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/instructor/create-lesson" className="btn-primary">Create New Lesson</Link>
      </div>

      <h3 className="section-title">Your Lesson Seasons</h3>
      <div className="grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h3>{lesson.title}</h3>
            <p className="lesson-meta">Duration: {lesson.durationHrs} hrs</p>
            <p className="lesson-meta">{lesson.joinedCount} student{lesson.joinedCount === 1 ? "" : "s"} registered</p>
            <Link to={`/instructor/lessons/${lesson.id}/registrations`} className="btn-primary">
              View Registrations
            </Link>
          </div>
        ))}
      </div>

      {lessons.length === 0 && <p className="lesson-meta">You haven't created any lesson seasons yet.</p>}
    </div>
  );
}

export default InstructorDashboard;