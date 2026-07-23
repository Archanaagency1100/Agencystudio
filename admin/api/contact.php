<?php
/**
 * Studio925 Public Contact Form API Endpoint
 * Handles POST requests to log contact submissions.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Ensure it is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method Not Allowed. Only POST requests are accepted."
    ]);
    exit();
}

require_once __DIR__ . '/../db.php';

// Helper to get client IP Address
function get_client_ip() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']) && !empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // HTTP_X_FORWARDED_FOR can contain a list of IPs, get the first one
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ipaddress = trim($ips[0]);
    } elseif (isset($_SERVER['HTTP_X_FORWARDED']) && !empty($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } elseif (isset($_SERVER['HTTP_FORWARDED_FOR']) && !empty($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_FORWARDED']) && !empty($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } elseif (isset($_SERVER['REMOTE_ADDR']) && !empty($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }
    return $ipaddress;
}

// Retrieve raw request body (in case it is JSON)
$input_data = json_decode(file_get_contents("php://input"), true);

// Fallback to standard URL-encoded form POST
if (empty($input_data)) {
    $input_data = $_POST;
}

// Extract inputs
$name = trim($input_data['name'] ?? '');
$email = trim($input_data['email'] ?? '');
$contact = trim($input_data['contact'] ?? '');
$message = trim($input_data['message'] ?? '');

$errors = [];

// Validate fields
if (empty($name)) {
    $errors['name'] = 'Name field is required.';
} elseif (strlen($name) > 100) {
    $errors['name'] = 'Name must not exceed 100 characters.';
}

if (empty($email)) {
    $errors['email'] = 'Email field is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email address format.';
} elseif (strlen($email) > 100) {
    $errors['email'] = 'Email must not exceed 100 characters.';
}

if (empty($contact)) {
    $errors['contact'] = 'Contact phone number is required.';
} elseif (strlen($contact) > 20) {
    $errors['contact'] = 'Contact number must not exceed 20 characters.';
}

// If validation errors exist, return 400 Bad Request
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Validation Failed",
        "errors" => $errors
    ]);
    exit();
}

try {
    $db = Database::getInstance();
    $ip_address = get_client_ip();
    $status = 'Pending';
    $admin_note = '';

    $stmt = $db->prepare("
        INSERT INTO contacts (name, email, contact, message, ip_address, status, admin_note)
        VALUES (:name, :email, :contact, :message, :ip_address, :status, :admin_note)
    ");

    $result = $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':contact' => $contact,
        ':message' => $message,
        ':ip_address' => $ip_address,
        ':status' => $status,
        ':admin_note' => $admin_note
    ]);

    if ($result) {
        $last_id = $db->lastInsertId();
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Contact inquiry submitted successfully.",
            "id" => (int)$last_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Failed to save contact inquiry. Please try again later."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Internal Database Error",
        "details" => DEVELOPMENT_MODE ? $e->getMessage() : "An error occurred while saving the enquiry."
    ]);
}
