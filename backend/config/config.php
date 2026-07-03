<?php
/**
 * Application Configuration
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'trijal_enterprises');

// API Configuration
define('API_URL', 'http://localhost/trijal-backend/api/');
define('APP_NAME', 'TRIJAL ENTERPRISES API');
define('APP_VERSION', '1.0.0');

// Email Configuration
define('ADMIN_EMAIL', 'trijalenterprises@gmail.com');
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', '');
define('SMTP_PASS', '');

// Security
define('JWT_SECRET', 'your_jwt_secret_key_here');
define('JWT_EXPIRY', 3600); // 1 hour

// CORS
define('ALLOWED_ORIGINS', ['http://localhost', 'http://localhost:3000', 'http://127.0.0.1']);

// File Upload
define('MAX_UPLOAD_SIZE', 5242880); // 5MB
define('ALLOWED_UPLOAD_TYPES', ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']);
define('UPLOAD_DIR', __DIR__ . '/../uploads/');

// Error Reporting
if ($_SERVER['HTTP_HOST'] === 'localhost' || $_SERVER['HTTP_HOST'] === '127.0.0.1') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Timezone
date_default_timezone_set('Asia/Kolkata');
?>