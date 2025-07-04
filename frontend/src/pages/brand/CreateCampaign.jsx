import { useState } from "react";
import axios from "axios";

const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: "",
    niche: "",
    city: "",
    description: "",
    startDate: "",
    endDate: "",
    rewardType: "barter",
    budgetMin: "",
    budgetMax: "",
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImages([...e.target.files].slice(0, 5)); // max 5 images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (form.rewardType === "money") {
        formData.append(
          "budgetRange",
          JSON.stringify({ min: form.budgetMin, max: form.budgetMax })
        );
      }

      images.forEach((img) => formData.append("images", img));

      await axios.post(`${import.meta.env.VITE_API_URL}/campaigns`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Campaign created successfully!");
      setForm({
        name: "",
        niche: "",
        city: "",
        description: "",
        startDate: "",
        endDate: "",
        rewardType: "barter",
        budgetMin: "",
        budgetMax: "",
      });
      setImages([]);
    } catch (err) {
      setMessage(
        "Error: " + (err.response?.data?.error || "Campaign creation failed")
      );
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Create Campaign</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Campaign Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <br />
        <label>Niche:</label>
        <input
          name="niche"
          value={form.niche}
          onChange={handleChange}
          required
        />

        <br />
        <label>City:</label>
        <input name="city" value={form.city} onChange={handleChange} required />

        <br />
        <label>Description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <br />
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <br />
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <br />
        <label>Reward Type:</label>
        <select
          name="rewardType"
          value={form.rewardType}
          onChange={handleChange}
        >
          <option value="barter">Barter</option>
          <option value="money">Money</option>
        </select>

        {form.rewardType === "money" && (
          <>
            <br />
            <label>Budget Min:</label>
            <input
              type="number"
              name="budgetMin"
              value={form.budgetMin}
              onChange={handleChange}
            />

            <br />
            <label>Budget Max:</label>
            <input
              type="number"
              name="budgetMax"
              value={form.budgetMax}
              onChange={handleChange}
            />
          </>
        )}

        <br />
        <label>Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <br />
        <button type="submit">Publish Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
