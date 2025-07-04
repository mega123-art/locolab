import Navbar from './Navbar';

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {(title || subtitle) && (
        <div className="dashboard-header">
          <div className="container">
            {title && <h1 className="dashboard-title">{title}</h1>}
            {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      
      <div className="page-container">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;