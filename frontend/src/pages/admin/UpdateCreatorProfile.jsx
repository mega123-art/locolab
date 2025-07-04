import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCreatorProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    location: "",
    niche: "",
    about: "",
    numberOfPosts: 0,
    avgLikes: 0,
    avgComments: 0,
    totalUploads: 0,
    postPerWeek: 0,
    engagementRate: 0,
    topHashtags: "",
    latestPosts: ["", "", ""],
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/creators/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data.profile;

        setProfile({
          location: data.location || "",
          niche: data.niche || "",
          about: data.about || "",
          numberOfPosts: data.numberOfPosts || 0,
          avgLikes: data.avgLikes || 0,
          avgComments: data.avgComments || 0,
          totalUploads: data.totalUploads || 0,
          postPerWeek: data.postPerWeek || 0,
          engagementRate: data.engagementRate || 0,
          topHashtags: data.topHashtags?.join(", ") || "",
          latestPosts: data.latestPosts || ["", "", ""],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePostChange = (index, value) => {
    const updated = [...profile.latestPosts];
    updated[index] = value;
    setProfile({ ...profile, latestPosts: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/creators/profile/${userId}`,
        {
          ...profile,
          topHashtags: profile.topHashtags.split(",").map((t) => t.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Update failed.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Update Creator Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Location:</label>
        <input
          name="location"
          value={profile.location}
          onChange={handleChange}
        />

        <br />
        <label>Niche:</label>
        <input name="niche" value={profile.niche} onChange={handleChange} />

        <br />
        <label>About:</label>
        <textarea name="about" value={profile.about} onChange={handleChange} />

        <br />
        <label>Number of Posts:</label>
        <input
          type="number"
          name="numberOfPosts"
          value={profile.numberOfPosts}
          onChange={handleChange}
        />

        <br />
        <label>Avg Likes:</label>
        <input
          type="number"
          name="avgLikes"
          value={profile.avgLikes}
          onChange={handleChange}
        />

        <br />
        <label>Avg Comments:</label>
        <input
          type="number"
          name="avgComments"
          value={profile.avgComments}
          onChange={handleChange}
        />

        <br />
        <label>Total Uploads:</label>
        <input
          type="number"
          name="totalUploads"
          value={profile.totalUploads}
          onChange={handleChange}
        />

        <br />
        <label>Post Per Week:</label>
        <input
          type="number"
          name="postPerWeek"
          value={profile.postPerWeek}
          onChange={handleChange}
        />

        <br />
        <label>Engagement Rate (%):</label>
        <input
          type="number"
          name="engagementRate"
          value={profile.engagementRate}
          onChange={handleChange}
        />

        <br />
        <label>Top Hashtags (comma separated):</label>
        <input
          name="topHashtags"
          value={profile.topHashtags}
          onChange={handleChange}
        />

        <br />
        <label>Latest Post URLs:</label>
        {profile.latestPosts.map((url, i) => (
          <div key={i}>
            <input
              value={url}
              onChange={(e) => handlePostChange(i, e.target.value)}
              placeholder={`Post ${i + 1}`}
            />
          </div>
        ))}

        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateCreatorProfile;
