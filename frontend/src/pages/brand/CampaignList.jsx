import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        // Note: You'll need to implement this endpoint in your backend
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/campaigns/brand/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCampaigns(res.data.campaigns || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns");
        // For now, set empty array if endpoint doesn't exist
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [token, user.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <PageLayout title="My Campaigns" subtitle="Manage your active and past campaigns">
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My Campaigns" subtitle="Manage your active and past campaigns">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {campaigns.length} Campaign{campaigns.length !== 1 ? 's' : ''}
        </h2>
        <Link to="/brand/campaign/new" className="btn btn-primary">
          Create New Campaign
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first campaign to start connecting with content creators.
          </p>
          <Link to="/brand/campaign/new" className="btn btn-primary">
            Create Your First Campaign
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="card campaign-card">
              <div className="card-body">
                <div className="flex items-start gap-6">
                  {campaign.images && campaign.images.length > 0 && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${campaign.images[0]}`}
                      alt={campaign.name}
                      className="campaign-image w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {campaign.name}
                      </h3>
                      <span className={`badge ${
                        new Date(campaign.endDate) > new Date() ? 'badge-success' : 'badge-warning'
                      }`}>
                        {new Date(campaign.endDate) > new Date() ? 'Active' : 'Ended'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {campaign.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="stat-item">
                        <div className="stat-value">{campaign.niche}</div>
                        <div className="stat-label">Niche</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{campaign.city}</div>
                        <div className="stat-label">Location</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{formatDate(campaign.startDate)}</div>
                        <div className="stat-label">Start Date</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{campaign.starredCreators?.length || 0}</div>
                        <div className="stat-label">Starred Creators</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Link
                        to={`/brand/campaign/${campaign._id}/starred`}
                        className="btn btn-secondary btn-sm"
                      >
                        View Starred Creators ({campaign.starredCreators?.length || 0})
                      </Link>
                      <span className={`badge ${
                        campaign.rewardType === 'money' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {campaign.rewardType === 'money' ? 'Paid' : 'Barter'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default CampaignList;