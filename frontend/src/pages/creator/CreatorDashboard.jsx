import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const CreatorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/creators/profile/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(res.data.profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, user.id]);

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
      <PageLayout title="Creator Dashboard" subtitle="Manage your creator profile and view opportunities">
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Creator Dashboard" subtitle="Manage your creator profile and view opportunities">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!profile ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Setup Pending</h3>
          <p className="text-gray-600 mb-6">
            Your profile is being set up by our admin team. You'll be notified once it's ready and visible to brands.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm text-yellow-800">Profile setup in progress</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {/* Profile Overview */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-start gap-6">
                  <div className="creator-avatar">
                    {getInitials(user.username || user.email)}
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      @{user.username}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {user.contactEmail || user.email}
                    </p>
                    
                    <div className="flex gap-4 mb-4">
                      {profile.niche && (
                        <span className="badge badge-success">{profile.niche}</span>
                      )}
                      {profile.location && (
                        <span className="badge badge-warning">{profile.location}</span>
                      )}
                    </div>
                    
                    {profile.about && (
                      <p className="text-gray-700">{profile.about}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Performance Statistics</h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="stat-item">
                    <div className="stat-value">{profile.numberOfPosts || 0}</div>
                    <div className="stat-label">Total Posts</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{profile.avgLikes?.toLocaleString() || '0'}</div>
                    <div className="stat-label">Avg Likes</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{profile.engagementRate || 0}%</div>
                    <div className="stat-label">Engagement Rate</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{profile.postsPerWeek || 0}</div>
                    <div className="stat-label">Posts/Week</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Hashtags */}
            {profile.topHashtags && profile.topHashtags.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Top Hashtags</h3>
                </div>
                <div className="card-body">
                  <div className="flex flex-wrap gap-2">
                    {profile.topHashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm bg-red-50 text-red-700 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Latest Posts */}
            {profile.latestPosts && profile.latestPosts.filter(post => post).length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Latest Posts</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-3">
                    {profile.latestPosts.filter(post => post).map((post, index) => (
                      <a
                        key={index}
                        href={post}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-sm text-gray-600">Post {index + 1}: </span>
                        <span className="text-red-600 hover:text-red-700">{post}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default CreatorDashboard;