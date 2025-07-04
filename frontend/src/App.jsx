import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import SavedCreators from "./pages/brand/SavedCreators";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BrandHome from "./pages/brand/BrandHome";
import CreateCampaign from "./pages/brand/CreateCampaign";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UpdateCreatorProfile from "./pages/admin/UpdateCreatorProfile";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/brand" element={<BrandHome />} />
          <Route path="/brand/campaign" element={<CreateCampaign />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/brand/saved/:campaignId" element={<SavedCreators />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/update/:userId"
            element={<UpdateCreatorProfile />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
