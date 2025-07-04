import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [fulfilled, setFulfilled] = useState([]);
  const [view, setView] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCreators = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const [pendingRes, fulfilledRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/admin/creators/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/admin/creators/fulfilled`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      setPending(pendingRes.data.pendingCreators);
      setFulfilled(fulfilledRes.data.fulfilledCreators);
    } catch (err) {
      console.error("Error fetching creators:", err);
      setError("Failed to load creator data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <PageLayout title="Admin Dashboard" subtitle="Manage creator profiles and platform content">
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Admin Dashboard" subtitle="Manage creator profiles and platform content">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setView("pending")}
            className={`btn ${view === "pending" ? "btn-primary" : "btn-outline"}`}
          >
            Pending Creators ({pending.length})
          </button>
          <button
            onClick={() => setView("fulfilled")}
            className={`btn ${view === "fulfilled" ? "btn-primary" : "btn-outline"}`}
          >
            Active Creators ({fulfilled.length})
          </button>
        </div>
      </div>

      {view === "pending" ? (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Pending Creator Profiles
            </h2>
            <p className="text-gray-600">
              These creators have registered but don't have complete profiles yet.
            </p>
          </div>

          {pending.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending creator profiles to review.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {pending.map((creator) => (
                <div key={creator._id} className="card">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="creator-avatar">
                        {getInitials(creator.username || creator.email)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          @{creator.username}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {creator.email}
                        </p>
                        {creator.contactEmail && (
                          <p className="text-sm text-gray-600 mb-3">
                            Contact: {creator.contactEmail}
                          </p>
                        )}
                        <span className="badge badge-warning">Pending Profile</span>
                      </div>
                      
                      <button
                        onClick={() => navigate(`/admin/creator/${creator._id}`)}
                        className="btn btn-primary"
                      >
                        Add Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Active Creator Profiles
            </h2>
            <p className="text-gray-600">
              These creators have complete profiles and are visible to brands.
            </p>
          </div>

          {fulfilled.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active creators</h3>
              <p className="text-gray-600">No creators with complete profiles yet.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {fulfilled.map((creator) => (
                <div key={creator._id} className="card">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="creator-avatar">
                        {getInitials(creator.user.username || creator.user.email)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          @{creator.user.username}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {creator.user.contactEmail}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                          <div className="stat-item">
                            <div className="stat-value">{creator.niche || 'N/A'}</div>
                            <div className="stat-label">Niche</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-value">{creator.location || 'N/A'}</div>
                            <div className="stat-label">Location</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-value">{creator.engagementRate || 0}%</div>
                            <div className="stat-label">Engagement</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-value">{creator.numberOfPosts || 0}</div>
                            <div className="stat-label">Posts</div>
                          </div>
                        </div>
                        
                        <span className="badge badge-success">Active Profile</span>
                      </div>
                      
                      <button
                        onClick={() => navigate(`/admin/creator/${creator.user._id}`)}
                        className="btn btn-secondary"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default AdminDashboard;