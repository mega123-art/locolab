import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [fulfilled, setFulfilled] = useState([]);
  const [view, setView] = useState("pending");

  const token = localStorage.getItem("token");

  const fetchCreators = async () => {
    try {
      const res1 = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/creators/pending`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const res2 = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/creators/fulfilled`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPending(res1.data.pendingCreators);
      setFulfilled(res2.data.fulfilledCreators);
    } catch (err) {
      console.error("Error fetching creators:", err);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: "auto" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView("pending")}>Pending Creators</button>
        <button onClick={() => setView("fulfilled")}>Fulfilled Creators</button>
      </div>

      {view === "pending" ? (
        <>
          <h3>Pending Creators</h3>
          {pending.length === 0 ? (
            <p>No pending creators</p>
          ) : (
            pending.map((creator) => (
              <div
                key={creator._id}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <p>
                  <strong>Email:</strong> {creator.email}
                </p>
                <p>
                  <strong>Username:</strong> {creator.username}
                </p>
                <p>
                  <strong>Contact Email:</strong> {creator.contactEmail}
                </p>
                <button
                  onClick={() =>
                    (window.location.href = `/admin/update/${creator._id}`)
                  }
                >
                  ➕ Add Profile
                </button>
              </div>
            ))
          )}
        </>
      ) : (
        <>
          <h3>Fulfilled Creators</h3>
          {fulfilled.length === 0 ? (
            <p>No fulfilled creators</p>
          ) : (
            fulfilled.map((creator) => (
              <div
                key={creator._id}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <p>
                  <strong>Username:</strong> {creator.user.username}
                </p>
                <p>
                  <strong>Contact Email:</strong> {creator.user.contactEmail}
                </p>
                <p>
                  <strong>Niche:</strong> {creator.niche}
                </p>
                <p>
                  <strong>Engagement:</strong> {creator.engagementRate}%
                </p>
                <button
                  onClick={() =>
                    (window.location.href = `/admin/update/${creator.user._id}`)
                  }
                >
                  ✏️ Update Profile
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
