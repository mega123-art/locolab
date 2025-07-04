import { useState } from 'react';

const CreatorCard = ({ creator, onStar, showStarButton = true }) => {
  const [isStarring, setIsStarring] = useState(false);

  const handleStar = async () => {
    if (isStarring) return;
    setIsStarring(true);
    try {
      await onStar(creator.user._id);
    } finally {
      setIsStarring(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="card creator-card fade-in">
      <div className="card-body">
        <div className="flex items-start gap-4 mb-4">
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
            {creator.niche && (
              <span className="badge badge-success">
                {creator.niche}
              </span>
            )}
          </div>
          
          {showStarButton && (
            <button
              onClick={handleStar}
              disabled={isStarring}
              className="btn btn-secondary btn-sm"
            >
              {isStarring ? (
                <span className="spinner w-4 h-4" />
              ) : (
                '⭐ Star'
              )}
            </button>
          )}
        </div>

        {creator.about && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {creator.about}
          </p>
        )}

        <div className="creator-stats">
          <div className="stat-item">
            <div className="stat-value">
              {creator.avgLikes?.toLocaleString() || '0'}
            </div>
            <div className="stat-label">Avg Likes</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">
              {creator.engagementRate || '0'}%
            </div>
            <div className="stat-label">Engagement</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">
              {creator.numberOfPosts || '0'}
            </div>
            <div className="stat-label">Posts</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">
              {creator.postsPerWeek || '0'}
            </div>
            <div className="stat-label">Per Week</div>
          </div>
        </div>

        {creator.topHashtags && creator.topHashtags.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-700 mb-2">Top Hashtags:</p>
            <div className="flex flex-wrap gap-1">
              {creator.topHashtags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-red-50 text-red-700 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorCard;