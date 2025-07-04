import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout";
import CreatorCard from "../../components/UI/CreatorCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const SavedCreators = () => {
  const { campaignId } = useParams();
  const [starred, setStarred] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStarred = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/campaigns/${campaignId}/starred`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStarred(res.data.starred);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load saved creators");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStarred();
  }, [campaignId, token]);

  if (isLoading) {
    return (
      <PageLayout title="Saved Creators" subtitle="Your starred creators for this campaign">
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading saved creators...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Saved Creators" subtitle="Your starred creators for this campaign">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {starred.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved creators yet</h3>
          <p className="text-gray-600 mb-4">
            You haven't starred any creators for this campaign yet.
          </p>
          <a href="/brand" className="btn btn-primary">
            Find Creators
          </a>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {starred.length} Saved Creator{starred.length !== 1 ? 's' : ''}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starred.map((creator) => (
              <CreatorCard
                key={creator._id}
                creator={creator}
                showStarButton={false}
              />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default SavedCreators;