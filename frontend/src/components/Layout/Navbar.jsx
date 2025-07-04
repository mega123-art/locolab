import { useAuth } from '../../auth/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to={user.role === 'brand' ? '/brand' : user.role === 'admin' ? '/admin' : '/creator'} className="navbar-brand">
            LocoLab
          </Link>
          
          <div className="navbar-nav">
            {user.role === 'brand' && (
              <>
                <Link 
                  to="/brand" 
                  className={`btn btn-sm ${isActive('/brand') ? 'btn-primary' : 'btn-outline'}`}
                >
                  Find Creators
                </Link>
                <Link 
                  to="/brand/campaigns" 
                  className={`btn btn-sm ${isActive('/brand/campaigns') ? 'btn-primary' : 'btn-outline'}`}
                >
                  My Campaigns
                </Link>
                <Link 
                  to="/brand/campaign/new" 
                  className={`btn btn-sm ${isActive('/brand/campaign/new') ? 'btn-primary' : 'btn-outline'}`}
                >
                  Create Campaign
                </Link>
              </>
            )}
            
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`btn btn-sm ${isActive('/admin') ? 'btn-primary' : 'btn-outline'}`}
              >
                Dashboard
              </Link>
            )}

            {user.role === 'creator' && (
              <Link 
                to="/creator" 
                className={`btn btn-sm ${isActive('/creator') ? 'btn-primary' : 'btn-outline'}`}
              >
                Dashboard
              </Link>
            )}
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.username || user.email}
              </span>
              <button onClick={handleLogout} className="btn btn-primary btn-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;