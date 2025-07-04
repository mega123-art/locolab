import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import CreatorCard from "../../components/UI/CreatorCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const BrandHome = () => {
  const [city, setCity] = useState("");
  const [creators, setCreators] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch user's campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/campaigns/brand/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCampaigns(res.data.campaigns || []);
        // Auto-select the first campaign if available
        if (res.data.campaigns && res.data.campaigns.length > 0) {
          setSelectedCampaign(res.data.campaigns[0]._id);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        // Don't show error for missing campaigns, just continue without them
      }
    };

    fetchCampaigns();
  }, [token, user.id]);

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

  const fetchCreators = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/creators?city=${encodeURIComponent(city)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreators(res.data.creators);
      setSearchPerformed(true);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load creators");
      setCreators([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCreators();
  };

  return (
    <PageLayout
      title="Find Content Creators"
      subtitle="Discover talented creators in your target location"
    >
      <div className="mb-8">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campaign Selection */}
              {campaigns.length > 0 && (
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
              )}

              {campaigns.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> You need to create a campaign first to star creators. 
                    <a href="/brand/campaign/new" className="text-red-600 hover:text-red-700 ml-1">
                      Create one here
                    </a>
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={city}
                    placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
                    onChange={(e) => setCity(e.target.value)}
                    className="form-input"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || !city.trim()}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Searching...
                    </>
                  ) : (
                    'Search Creators'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Searching for creators...</p>
        </div>
      )}

      {!isLoading && searchPerformed && creators.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No creators found</h3>
          <p className="text-gray-600">
            No creators found in "{city}". Try searching for a different city.
          </p>
        </div>
      )}

      {creators.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Found {creators.length} creator{creators.length !== 1 ? 's' : ''} in {city}
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
            {creators.map((creator) => (
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

      {!searchPerformed && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
          <p className="text-gray-600">
            Enter a city name above to find talented content creators in that location.
          </p>
        </div>
      )}
    </PageLayout>
  );
};

export default BrandHome;