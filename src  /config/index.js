require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  mongodbUri: process.env.MONGODB_URI,
  apiKey: process.env.API_KEY,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  typebotApiKey: process.env.TYPEBOT_API_KEY,
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
  jwtSecret: process.env.JWT_SECRET,
};
