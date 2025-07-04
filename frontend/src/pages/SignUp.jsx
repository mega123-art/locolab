import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "username") setUsernameAvailable(null);
  };

  const checkUsername = async () => {
    if (!form.username || form.role !== 'creator') return;
    
    setCheckingUsername(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/check-username?value=${form.username}`
      );
      setUsernameAvailable(res.data.available);
    } catch (err) {
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, form);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card">
          <div className="card-header text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join LocoLab and start connecting
            </p>
          </div>
          
          <div className="card-body">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">I am a</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="form-select"
                  disabled={isLoading}
                >
                  <option value="creator">Content Creator</option>
                  <option value="brand">Brand</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a strong password"
                  required
                  disabled={isLoading}
                />
              </div>

              {form.role === "creator" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        onBlur={checkUsername}
                        className="form-input"
                        placeholder="Choose a unique username"
                        required
                        disabled={isLoading}
                      />
                      {checkingUsername && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <LoadingSpinner size="sm" />
                        </div>
                      )}
                    </div>
                    {usernameAvailable === true && (
                      <p className="form-success">✓ Username is available</p>
                    )}
                    {usernameAvailable === false && (
                      <p className="form-error">✗ Username is already taken</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={form.contactEmail}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Public email for brand contacts"
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This email will be visible to brands who want to contact you
                    </p>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={isLoading || (form.role === 'creator' && usernameAvailable === false)}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>
          
          <div className="card-footer text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-red-600 hover:text-red-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;