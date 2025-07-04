import { useState } from "react";
import axios from "axios";
import PageLayout from "../../components/Layout/PageLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: "",
    niche: "",
    city: "",
    description: "",
    startDate: "",
    endDate: "",
    rewardType: "barter",
    budgetMin: "",
    budgetMax: "",
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(form).forEach(([key, value]) => {
        if (key !== 'budgetMin' && key !== 'budgetMax') {
          formData.append(key, value);
        }
      });

      // Add brand ID
      formData.append('brandId', user.id);

      // Add budget range if money reward type
      if (form.rewardType === "money") {
        formData.append(
          "budgetRange",
          JSON.stringify({ min: Number(form.budgetMin), max: Number(form.budgetMax) })
        );
      }

      // Add images
      images.forEach((img) => formData.append("images", img));

      await axios.post(`${import.meta.env.VITE_API_URL}/campaigns`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Campaign created successfully!");
      setMessageType("success");
      
      // Reset form
      setForm({
        name: "",
        niche: "",
        city: "",
        description: "",
        startDate: "",
        endDate: "",
        rewardType: "barter",
        budgetMin: "",
        budgetMax: "",
      });
      setImages([]);
      
      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      setMessage(err.response?.data?.error || "Campaign creation failed");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="Create New Campaign"
      subtitle="Launch a campaign to connect with content creators"
    >
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="card-body">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={messageType === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Campaign Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter campaign name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Niche *</label>
                  <input
                    name="niche"
                    value={form.niche}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Fashion, Food, Tech"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target City *</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Mumbai, Delhi"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Describe your campaign, requirements, and expectations..."
                  rows={4}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Reward Type *</label>
                <select
                  name="rewardType"
                  value={form.rewardType}
                  onChange={handleChange}
                  className="form-select"
                  disabled={isLoading}
                >
                  <option value="barter">Barter (Product Exchange)</option>
                  <option value="money">Monetary Compensation</option>
                </select>
              </div>

              {form.rewardType === "money" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Minimum Budget (₹)</label>
                    <input
                      type="number"
                      name="budgetMin"
                      value={form.budgetMin}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="5000"
                      min="0"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Maximum Budget (₹)</label>
                    <input
                      type="number"
                      name="budgetMax"
                      value={form.budgetMax}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="50000"
                      min="0"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Campaign Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-input"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload up to 5 images (JPG, PNG, GIF)
                </p>
                {images.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {images.length} file{images.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Creating Campaign...
                    </>
                  ) : (
                    'Create Campaign'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreateCampaign;