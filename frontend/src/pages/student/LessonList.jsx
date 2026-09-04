import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../App.css";

function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [joiningId, setJoiningId] = useState(null);

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

  async function handleJoin(seasonId) {
    setMessage("");
    setJoiningId(seasonId);
    try {
      await api.post(`/registrations/${seasonId}/join`);
      setMessage("Successfully joined the lesson season!");
      fetchLessons();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to join");
    } finally {
      setJoiningId(null);
    }
  }

  if (loading) return <p className="container">Loading lessons...</p>;

  return (
    <div className="container">
      <h2>Lesson Seasons</h2>
      {message && <p className="lesson-message">{message}</p>}

      <div className="grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h3>{lesson.title}</h3>
            <p className="lesson-meta">Presenter: {lesson.presenter}</p>
            <p className="lesson-meta">Duration: {lesson.durationHrs} hrs</p>
            <p className="lesson-meta">
              {new Date(lesson.startDate).toLocaleDateString()} – {new Date(lesson.endDate).toLocaleDateString()}
            </p>
            <p className="lesson-meta">{lesson.joinedCount} student{lesson.joinedCount === 1 ? "" : "s"} joined</p>

            <button
              className="btn-primary"
              onClick={() => handleJoin(lesson.id)}
              disabled={joiningId === lesson.id}
            >
              {joiningId === lesson.id ? "Joining..." : "Join Lesson"}
            </button>
          </div>
        ))}
      </div>

      {lessons.length === 0 && <p className="lesson-meta">No lesson seasons available yet.</p>}
    </div>
  );
}

export default LessonList;