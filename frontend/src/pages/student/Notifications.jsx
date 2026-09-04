import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../App.css";

function Notifications() {
  const [notifications, setNotifications] = useState({ upcoming: [], missed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="container">Loading notifications...</p>;

  const { upcoming, missed } = notifications;

  return (
    <div className="container">
      <h2>Notifications</h2>

      <section className="notification-full-section">
        <h3>Missed Lessons</h3>
        {missed.length === 0 && <p className="lesson-meta">No missed lessons.</p>}
        <div className="grid">
          {missed.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <span className="badge-missed">Missed</span>
              <h3>{lesson.title}</h3>
              <p className="lesson-meta">Presenter: {lesson.presenter}</p>
              <p className="lesson-meta">
                Ended {new Date(lesson.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="notification-full-section">
        <h3>Upcoming Lessons</h3>
        {upcoming.length === 0 && <p className="lesson-meta">No upcoming lessons.</p>}
        <div className="grid">
          {upcoming.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <span className="badge-upcoming">Upcoming</span>
              <h3>{lesson.title}</h3>
              <p className="lesson-meta">Presenter: {lesson.presenter}</p>
              <p className="lesson-meta">
                Starts {new Date(lesson.startDate).toLocaleDateString()}
              </p>
              <p className="lesson-meta">Duration: {lesson.durationHrs} hrs</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Notifications;