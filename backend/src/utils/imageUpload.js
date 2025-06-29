import multer from "multer"
const storage = multer.memoryStorage();
export const upload = multer({ storage }).array("images", 5);
export const uploadImages = async (files) => {
  const imageUrls = files.map((file) => {
    // Example: Upload to cloud storage here and get the public URL
    return `https://your-cloud-storage.com/${file.originalname}`;
  });
  return imageUrls;
};