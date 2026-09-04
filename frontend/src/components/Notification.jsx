import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function NotificationBell() {
  const [notifications, setNotifications] = useState({ upcoming: [], missed: [] });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function fetchNotifications() {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  }

  const totalCount = notifications.upcoming.length + notifications.missed.length;

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <button className="bell-icon" onClick={() => setOpen(!open)}>
        🔔
        {totalCount > 0 && <span className="notification-count">{totalCount}</span>}
      </button>

      {open && (
        <div className="notification-dropdown">
          {notifications.missed.length > 0 && (
            <div className="notification-section">
              <h4>Missed Lessons</h4>
              {notifications.missed.map((lesson) => (
                <div key={lesson.id} className="notification-item missed">
                  <strong>{lesson.title}</strong>
                  <p>You missed this lesson with {lesson.presenter}</p>
                </div>
              ))}
            </div>
          )}

          {notifications.upcoming.length > 0 && (
            <div className="notification-section">
              <h4>Upcoming Lessons</h4>
              {notifications.upcoming.map((lesson) => (
                <div key={lesson.id} className="notification-item upcoming">
                  <strong>{lesson.title}</strong>
                  <p>{lesson.presenter} · starts {new Date(lesson.startDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}

          {totalCount === 0 && <p className="notification-empty">No notifications</p>}

          <button
            className="notification-view-all"
            onClick={() => {
              setOpen(false);
              navigate("/student/notifications");
            }}
          >
            View all
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;