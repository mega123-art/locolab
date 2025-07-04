import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SavedCreators = () => {
  const { campaignId } = useParams();
  const [starred, setStarred] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/campaigns/${campaignId}/starred`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStarred(res.data.starred);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load saved creators");
      }
    };

    fetchStarred();
  }, [campaignId]);

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>Saved Creators</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {starred.length === 0 ? (
        <p>No creators saved yet.</p>
      ) : (
        starred.map((c) => (
          <div
            key={c._id}
            style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
          >
            <h4>{c.user.username}</h4>
            <p>Email: {c.user.contactEmail}</p>
            <p>Niche: {c.niche}</p>
            <p>Avg Likes: {c.avgLikes}</p>
            <p>Engagement: {c.engagementRate}%</p>
            <p>Top Hashtags: {c.topHashtags?.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCreators;
