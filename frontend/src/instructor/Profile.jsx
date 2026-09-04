import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "../App.css";

function Profile() {
  const { user } = useAuth();
  const [bio, setBio] = useState(user.bio || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await api.patch("/instructors/profile", { bio });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>Instructor Profile</h2>

        <div className="profile-field">
          <label>Full Name</label>
          <p>{user.fullName}</p>
        </div>

        <div className="profile-field">
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSave}>
          <label>Bio</label>
          <textarea
            rows="4"
            placeholder="Tell students a bit about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;