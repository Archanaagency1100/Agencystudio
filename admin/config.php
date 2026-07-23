<?php
/**
 * Studio925 Admin Panel Configuration File
 */

// Database Configuration
// Options: 'sqlite' or 'mysql'
define('DB_DRIVER', 'sqlite');

// SQLite specific settings
define('SQLITE_FILE', __DIR__ . '/.ht_studio925.sqlite');

// MySQL specific settings
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'a1100s6k_backend');
define('DB_USER', 'a1100s6k_backend');
define('DB_PASS', '$GGIC8K]8l8U1x#q');

// Application Settings
define('APP_NAME', 'Studio925 Admin');
define('APP_KEY', 'studio925-secure-session-key-2026'); // Secret key for basic application usage

// Session Settings
define('SESSION_LIFETIME', 86400); // 24 hours in seconds

// Error reporting - disable for production (cPanel), enable for local development
define('DEVELOPMENT_MODE', true);

if (DEVELOPMENT_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
