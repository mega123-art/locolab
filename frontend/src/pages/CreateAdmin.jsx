import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";

const CreateAdmin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    adminSecret: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/create-admin`, form);
      setSuccess("Admin account created successfully! You can now sign in.");
      setForm({ email: "", password: "", adminSecret: "" });
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create admin account");
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
              Create Admin Account
            </h1>
            <p className="text-gray-600">
              Create an administrator account for LocoLab
            </p>
          </div>
          
          <div className="card-body">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Admin Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter admin email"
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

              <div className="form-group">
                <label className="form-label">Admin Secret</label>
                <input
                  type="password"
                  name="adminSecret"
                  value={form.adminSecret}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter admin secret (admin123)"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use "admin123" as the admin secret for this demo
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creating Admin...
                  </>
                ) : (
                  'Create Admin Account'
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

export default CreateAdmin;