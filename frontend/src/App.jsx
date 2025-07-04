import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BrandHome from "./pages/brand/BrandHome";
import CreateCampaign from "./pages/brand/CreateCampaign";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/brand" element={<BrandHome />} />
          <Route path="/brand/campaign" element={<CreateCampaign />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/brand/saved/:campaignId" element={<SavedCreators />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
