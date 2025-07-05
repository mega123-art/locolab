import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import CreatorCard from "../../components/UI/CreatorCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const AllCreators = () => {
  const [creators, setCreators] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    niche: "",
    minEngagement: "",
    maxEngagement: "",
    minPosts: "",
    maxPosts: ""
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [creatorsRes, campaignsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/creators/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/campaigns/brand/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setCreators(creatorsRes.data.creators || []);
        setFilteredCreators(creatorsRes.data.creators || []);
        setCampaigns(campaignsRes.data.campaigns || []);
        
        // Auto-select the first campaign if available
        if (campaignsRes.data.campaigns && campaignsRes.data.campaigns.length > 0) {
          setSelectedCampaign(campaignsRes.data.campaigns[0]._id);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load creators");
        setCreators([]);
        setFilteredCreators([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, user.id]);

  useEffect(() => {
    let filtered = creators;

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(creator => 
        creator.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by niche
    if (filters.niche) {
      filtered = filtered.filter(creator => 
        creator.niche?.toLowerCase().includes(filters.niche.toLowerCase())
      );
    }

    // Filter by engagement rate
    if (filters.minEngagement) {
      filtered = filtered.filter(creator => 
        (creator.engagementRate || 0) >= parseFloat(filters.minEngagement)
      );
    }
    if (filters.maxEngagement) {
      filtered = filtered.filter(creator => 
        (creator.engagementRate || 0) <= parseFloat(filters.maxEngagement)
      );
    }

    // Filter by number of posts
    if (filters.minPosts) {
      filtered = filtered.filter(creator => 
        (creator.numberOfPosts || 0) >= parseInt(filters.minPosts)
      );
    }
    if (filters.maxPosts) {
      filtered = filtered.filter(creator => 
        (creator.numberOfPosts || 0) <= parseInt(filters.maxPosts)
      );
    }

    setFilteredCreators(filtered);
  }, [filters, creators]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      niche: "",
      minEngagement: "",
      maxEngagement: "",
      minPosts: "",
      maxPosts: ""
    });
  };

  const handleStar = async (creatorId) => {
    if (!selectedCampaign) {
      alert("Please select a campaign first or create one to star creators.");
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/campaigns/${selectedCampaign}/star/${creatorId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      alert("Creator starred successfully!");
    } catch (err) {
      console.error("Star error:", err);
      alert(err.response?.data?.error || "Failed to star creator. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="All Creators" subtitle="Browse and discover talented content creators">
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading creators...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="All Creators" subtitle="Browse and discover talented content creators">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Campaign Selection */}
      {campaigns.length > 0 && (
        <div className="mb-6">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Select Campaign to Star Creators</label>
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="form-select"
                >
                  <option value="">Choose a campaign...</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign._id} value={campaign._id}>
                      {campaign.name} ({campaign.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {campaigns.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> You need to create a campaign first to star creators. 
            <a href="/brand/campaign/new" className="text-red-600 hover:text-red-700 ml-1">
              Create one here
            </a>
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-8">
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Creators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="form-input"
                  placeholder="Search by location..."
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
                <label className="form-label">Min Posts</label>
                <input
                  type="number"
                  name="minPosts"
                  value={filters.minPosts}
                  onChange={handleFilterChange}
                  className="form-input"
                  placeholder="Minimum posts..."
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Posts</label>
                <input
                  type="number"
                  name="maxPosts"
                  value={filters.maxPosts}
                  onChange={handleFilterChange}
                  className="form-input"
                  placeholder="Maximum posts..."
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Min Engagement (%)</label>
                <input
                  type="number"
                  name="minEngagement"
                  value={filters.minEngagement}
                  onChange={handleFilterChange}
                  className="form-input"
                  placeholder="Min engagement rate..."
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Engagement (%)</label>
                <input
                  type="number"
                  name="maxEngagement"
                  value={filters.maxEngagement}
                  onChange={handleFilterChange}
                  className="form-input"
                  placeholder="Max engagement rate..."
                  min="0"
                  max="100"
                  step="0.1"
                />
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
                Showing {filteredCreators.length} of {creators.length} creators
              </span>
            </div>
          </div>
        </div>
      </div>

      {filteredCreators.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No creators found</h3>
          <p className="text-gray-600">
            {creators.length === 0 
              ? "No creators are currently available." 
              : "No creators match your current filters. Try adjusting your search criteria."
            }
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredCreators.length} Creator{filteredCreators.length !== 1 ? 's' : ''} Found
            </h2>
            {selectedCampaign && (
              <div className="text-sm text-gray-600">
                Starring for: <span className="font-medium">
                  {campaigns.find(c => c._id === selectedCampaign)?.name}
                </span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={creator._id}
                creator={creator}
                onStar={handleStar}
                showStarButton={!!selectedCampaign}
              />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default AllCreators;