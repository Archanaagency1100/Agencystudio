<?php
/**
 * Studio925 Authentication and Session Helpers
 */
require_once __DIR__ . '/config.php';

// Start a secure session
function start_secure_session() {
    if (session_status() === PHP_SESSION_NONE) {
        // Set session cookie parameters for security
        $cookieParams = session_get_cookie_params();
        session_set_cookie_params([
            'lifetime' => SESSION_LIFETIME,
            'path' => $cookieParams['path'],
            'domain' => $cookieParams['domain'],
            'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        session_start();
    }
}

start_secure_session();

// Check if user is logged in
function is_logged_in() {
    return isset($_SESSION['user_id']) && isset($_SESSION['username']);
}

// Enforce login status
function require_login() {
    if (!is_logged_in()) {
        header("Location: login.php");
        exit();
    }
}

// Enforce administrator role
function require_admin() {
    require_login();
    if ($_SESSION['user_role'] !== 'Admin') {
        header("Location: dashboard.php?error=unauthorized");
        exit();
    }
}

// Generate CSRF Token
function generate_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Validate CSRF Token
function validate_csrf_token($token) {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

// Helper to escape HTML output (XSS protection)
function escape($html) {
    return htmlspecialchars($html ?? '', ENT_QUOTES, 'UTF-8');
}
