import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

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
    postsPerWeek: 0,
    engagementRate: 0,
    topHashtags: "",
    latestPosts: ["", "", ""],
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/creators/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCreatorInfo({
          email: res.data.contactEmail,
          username: res.data.profile?.user?.username || 'Unknown'
        });

        const data = res.data.profile;
        if (data) {
          setProfile({
            location: data.location || "",
            niche: data.niche || "",
            about: data.about || "",
            numberOfPosts: data.numberOfPosts || 0,
            avgLikes: data.avgLikes || 0,
            avgComments: data.avgComments || 0,
            totalUploads: data.totalUploads || 0,
            postsPerWeek: data.postsPerWeek || 0,
            engagementRate: data.engagementRate || 0,
            topHashtags: data.topHashtags?.join(", ") || "",
            latestPosts: data.latestPosts || ["", "", ""],
          });
        }
      } catch (err) {
        console.error(err);
        setMessage("Failed to load creator profile");
        setMessageType("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePostChange = (index, value) => {
    const updated = [...profile.latestPosts];
    updated[index] = value;
    setProfile(prev => ({ ...prev, latestPosts: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/creators/${userId}`,
        {
          ...profile,
          topHashtags: profile.topHashtags
            .split(",")
            .map((t) => t.trim())
            .filter(t => t.length > 0),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessage("Profile updated successfully!");
      setMessageType("success");
      
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile. Please try again.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Update Creator Profile">
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Update Creator Profile"
      subtitle={creatorInfo ? `Editing profile for @${creatorInfo.username}` : "Edit creator profile"}
    >
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="card-body">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={messageType === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Mumbai, Maharashtra"
                    required
                    disabled={isSaving}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Niche *</label>
                  <input
                    name="niche"
                    value={profile.niche}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Fashion, Food, Tech"
                    required
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">About</label>
                <textarea
                  name="about"
                  value={profile.about}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Brief description about the creator..."
                  rows={3}
                  disabled={isSaving}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Number of Posts</label>
                  <input
                    type="number"
                    name="numberOfPosts"
                    value={profile.numberOfPosts}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    disabled={isSaving}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Posts Per Week</label>
                  <input
                    type="number"
                    name="postsPerWeek"
                    value={profile.postsPerWeek}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    step="0.1"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Average Likes</label>
                  <input
                    type="number"
                    name="avgLikes"
                    value={profile.avgLikes}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    disabled={isSaving}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Average Comments</label>
                  <input
                    type="number"
                    name="avgComments"
                    value={profile.avgComments}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Total Uploads</label>
                  <input
                    type="number"
                    name="totalUploads"
                    value={profile.totalUploads}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    disabled={isSaving}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Engagement Rate (%)</label>
                  <input
                    type="number"
                    name="engagementRate"
                    value={profile.engagementRate}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    max="100"
                    step="0.1"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Top Hashtags</label>
                <input
                  name="topHashtags"
                  value={profile.topHashtags}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="fashion, style, ootd, mumbai (comma separated)"
                  disabled={isSaving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter hashtags separated by commas (without # symbol)
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Latest Post URLs</label>
                <div className="space-y-3">
                  {profile.latestPosts.map((url, i) => (
                    <input
                      key={i}
                      value={url}
                      onChange={(e) => handlePostChange(i, e.target.value)}
                      className="form-input"
                      placeholder={`Latest post ${i + 1} URL`}
                      type="url"
                      disabled={isSaving}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg flex-1"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Saving Profile...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="btn btn-outline"
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UpdateCreatorProfile;