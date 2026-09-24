import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET || 'house_robotics_super_secret_jwt_key_2026_production_grade',
  jwtExpiresIn: '7d',
  sessionSecret: process.env.SESSION_SECRET || 'house_robotics_session_secret_2026',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  
  // Official Contact Details
  adminEmail: process.env.ADMIN_EMAIL || 'sameerliaqat81@gmail.com',
  officialWhatsApp: '+92 347 4542881',
  officialEmail: 'sameerliaqat81@gmail.com',
  companyName: 'House Robotics',

  // Email Config
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'House Robotics <notifications@house-robotics.com>'
  },

  // Media upload path
  uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
  maxUploadSize: 10 * 1024 * 1024 // 10 MB
};
