import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function LessonRegistrations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, [id]);

  async function fetchRegistrations() {
    try {
      const lessonRes = await api.get(`/lessons/${id}`);
      setLesson(lessonRes.data.data);
      
      const regRes = await api.get(`/registrations/lesson/${id}`);
      setRegistrations(regRes.data.data || []);
    } catch (err) {
      console.error("Failed to load registrations", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="container">Loading registrations...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn-primary">← Back</button>
      <h2>Registrations for: {lesson?.title || "Lesson"}</h2>
      
      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "0.5rem", textAlign: "left" }}>Student Name</th>
              <th style={{ padding: "0.5rem", textAlign: "left" }}>Email</th>
              <th style={{ padding: "0.5rem", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "0.5rem" }}>{reg.studentName}</td>
                <td style={{ padding: "0.5rem" }}>{reg.studentEmail}</td>
                <td style={{ padding: "0.5rem" }}>{reg.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LessonRegistrations;
