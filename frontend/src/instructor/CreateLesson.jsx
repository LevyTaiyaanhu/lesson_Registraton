import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function CreateLesson() {
  const [title, setTitle] = useState("");
  const [presenter, setPresenter] = useState("");
  const [durationHrs, setDurationHrs] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/lessons", {
        title,
        presenter,
        durationHrs: Number(durationHrs),
        startDate,
        endDate,
        capacity: capacity ? Number(capacity) : null,
      });
      navigate("/instructor");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create lesson");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>Create Lesson Season</h2>
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Lesson Title</label>
          <input
            placeholder="e.g. React"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Presenter</label>
          <input
            placeholder="e.g. Mr. Ndlovu"
            value={presenter}
            onChange={(e) => setPresenter(e.target.value)}
            required
          />

          <label>Duration (hours)</label>
          <input
            type="number"
            placeholder="e.g. 20"
            value={durationHrs}
            onChange={(e) => setDurationHrs(e.target.value)}
            required
          />

          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <label>Capacity (optional)</label>
          <input
            type="number"
            placeholder="e.g. 30"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateLesson;