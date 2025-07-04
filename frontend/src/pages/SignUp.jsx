import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "creator",
    email: "",
    password: "",
    username: "",
    contactEmail: "",
  });

  const [error, setError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "username") setUsernameAvailable(null); // reset check
  };

  const checkUsername = async () => {
    if (!form.username) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/check-username?value=${
          form.username
        }`
      );
      setUsernameAvailable(res.data.available);
    } catch (err) {
      setUsernameAvailable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, form);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Role:</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="creator">Creator</option>
          <option value="brand">Brand</option>
        </select>

        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {form.role === "creator" && (
          <>
            <br />
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              onBlur={checkUsername}
              required
            />
            {usernameAvailable === true && (
              <span style={{ color: "green" }}>✔ Available</span>
            )}
            {usernameAvailable === false && (
              <span style={{ color: "red" }}>✘ Taken</span>
            )}

            <br />
            <label>Contact Email (Public):</label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              required
            />
          </>
        )}

        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
