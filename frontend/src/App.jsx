import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import SavedCreators from "./pages/brand/SavedCreators";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateAdmin from "./pages/CreateAdmin";
import BrandHome from "./pages/brand/BrandHome";
import CreateCampaign from "./pages/brand/CreateCampaign";
import CampaignList from "./pages/brand/CampaignList";
import AllCreators from "./pages/brand/AllCreators";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UpdateCreatorProfile from "./pages/admin/UpdateCreatorProfile";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import AllCampaigns from "./pages/creator/AllCampaigns";
import LandingPage from "./pages/LandingPage";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Brand routes */}
          <Route 
            path="/brand" 
            element={
              <ProtectedRoute allowedRoles={['brand']}>
                <BrandHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/brand/campaigns" 
            element={
              <ProtectedRoute allowedRoles={['brand']}>
                <CampaignList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/brand/campaign/new" 
            element={
              <ProtectedRoute allowedRoles={['brand']}>
                <CreateCampaign />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/brand/creators" 
            element={
              <ProtectedRoute allowedRoles={['brand']}>
                <AllCreators />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/brand/campaign/:campaignId/starred" 
            element={
              <ProtectedRoute allowedRoles={['brand']}>
                <SavedCreators />
              </ProtectedRoute>
            } 
          />

          {/* Protected Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/creator/:userId" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UpdateCreatorProfile />
              </ProtectedRoute>
            } 
          />

          {/* Protected Creator routes */}
          <Route 
            path="/creator" 
            element={
              <ProtectedRoute allowedRoles={['creator']}>
                <CreatorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/creator/campaigns" 
            element={
              <ProtectedRoute allowedRoles={['creator']}>
                <AllCampaigns />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;