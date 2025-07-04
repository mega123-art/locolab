import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <a href="#" className="navbar-brand">
            LocoLab
          </a>
          
          <div className="navbar-nav">
            {user.role === 'brand' && (
              <>
                <a href="/brand" className="btn btn-outline btn-sm">
                  Find Creators
                </a>
                <a href="/brand/campaign" className="btn btn-outline btn-sm">
                  Create Campaign
                </a>
              </>
            )}
            
            {user.role === 'admin' && (
              <a href="/admin" className="btn btn-outline btn-sm">
                Dashboard
              </a>
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