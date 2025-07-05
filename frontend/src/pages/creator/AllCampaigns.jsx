import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    niche: "",
    rewardType: "",
    status: "active"
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/campaigns/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCampaigns(res.data.campaigns || []);
        setFilteredCampaigns(res.data.campaigns || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns");
        setCampaigns([]);
        setFilteredCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCampaigns();
  }, [token]);

  useEffect(() => {
    let filtered = campaigns;

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter(campaign => 
        campaign.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Filter by niche
    if (filters.niche) {
      filtered = filtered.filter(campaign => 
        campaign.niche.toLowerCase().includes(filters.niche.toLowerCase())
      );
    }

    // Filter by reward type
    if (filters.rewardType) {
      filtered = filtered.filter(campaign => campaign.rewardType === filters.rewardType);
    }

    // Filter by status
    if (filters.status === "active") {
      filtered = filtered.filter(campaign => new Date(campaign.endDate) > new Date());
    } else if (filters.status === "ended") {
      filtered = filtered.filter(campaign => new Date(campaign.endDate) <= new Date());
    }

    setFilteredCampaigns(filtered);
  }, [filters, campaigns]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      niche: "",
      rewardType: "",
      status: "active"
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isActive = (campaign) => new Date(campaign.endDate) > new Date();

  if (isLoading) {
    return (
      <PageLayout title="All Campaigns" subtitle="Discover brand campaigns looking for creators">
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="All Campaigns" subtitle="Discover brand campaigns looking for creators">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-8">
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Campaigns</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="form-input"
                  placeholder="Search by city..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Niche</label>
                <input
                  type="text"
                  name="niche"
                  value={filters.niche}
                  onChange={handleFilterChange}
                  className="form-input"
                  placeholder="Search by niche..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reward Type</label>
                <select
                  name="rewardType"
                  value={filters.rewardType}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Types</option>
                  <option value="money">Paid</option>
                  <option value="barter">Barter</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Campaigns</option>
                  <option value="active">Active</option>
                  <option value="ended">Ended</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={clearFilters}
                className="btn btn-outline btn-sm"
              >
                Clear Filters
              </button>
              <span className="text-sm text-gray-600 flex items-center">
                Showing {filteredCampaigns.length} of {campaigns.length} campaigns
              </span>
            </div>
          </div>
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-600">
            {campaigns.length === 0 
              ? "No campaigns are currently available." 
              : "No campaigns match your current filters. Try adjusting your search criteria."
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredCampaigns.map((campaign) => (
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
                      <div className="flex gap-2">
                        <span className={`badge ${
                          isActive(campaign) ? 'badge-success' : 'badge-warning'
                        }`}>
                          {isActive(campaign) ? 'Active' : 'Ended'}
                        </span>
                        <span className={`badge ${
                          campaign.rewardType === 'money' ? 'badge-success' : 'badge-warning'
                        }`}>
                          {campaign.rewardType === 'money' ? 'Paid' : 'Barter'}
                        </span>
                      </div>
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
                        <div className="stat-value">{formatDate(campaign.endDate)}</div>
                        <div className="stat-label">End Date</div>
                      </div>
                    </div>

                    {campaign.rewardType === 'money' && campaign.budgetRange && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-700">Budget Range: </span>
                        <span className="text-green-600 font-semibold">
                          ₹{campaign.budgetRange.min?.toLocaleString()} - ₹{campaign.budgetRange.max?.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={!isActive(campaign)}
                      >
                        {isActive(campaign) ? 'Apply Now' : 'Campaign Ended'}
                      </button>
                      <button className="btn btn-outline btn-sm">
                        View Details
                      </button>
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

export default AllCampaigns;