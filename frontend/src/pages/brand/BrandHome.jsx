import { useEffect, useState } from "react";
import axios from "axios";

const BrandHome = () => {
  const [city, setCity] = useState("");
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const handleStar = async (creatorId) => {
    try {
      const campaignId = "YOUR_ACTIVE_CAMPAIGN_ID"; // Get from state or selection
      await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/campaigns/${campaignId}/star/${creatorId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Creator starred successfully!");
    } catch (err) {
      alert("Failed to star creator");
    }
  };

  const fetchCreators = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/creators?city=${city}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreators(res.data.creators);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load creators");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>Find Creators By City</h2>

      <input
        type="text"
        value={city}
        placeholder="Enter city..."
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchCreators}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {creators.map((creator) => (
          <div
            key={creator._id}
            style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
          >
            <h4>{creator.user.username}</h4>
            <p>Email: {creator.user.contactEmail}</p>
            <p>Niche: {creator.niche}</p>
            <p>Avg Likes: {creator.avgLikes}</p>
            <p>Engagement Rate: {creator.engagementRate}%</p>
            <p>Top Hashtags: {creator.topHashtags?.join(", ")}</p>
            <button onClick={() => handleStar(creator.user._id)}>
              ⭐ Star
            </button>

            {/* Later: add star/save button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandHome;
