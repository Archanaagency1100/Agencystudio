<?php
/**
 * Studio925 Secure Image Upload Handler
 */
require_once __DIR__ . '/auth.php';

// Only allow authenticated users to upload files
if (!is_logged_in()) {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

/**
 * Handle cover image upload.
 * Returns the path to the uploaded file relative to the web root, or false on failure.
 *
 * @param array $file The $_FILES['cover_image'] entry
 * @param string &$error Reference parameter to return error messages
 * @return string|false Path to file, or false
 */
function handle_image_upload($file, &$error) {
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        if (isset($file) && $file['error'] !== UPLOAD_ERR_NO_FILE) {
            switch ($file['error']) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    $error = 'The uploaded file exceeds the maximum allowed size (5MB).';
                    break;
                default:
                    $error = 'An error occurred during file upload.';
            }
            return false;
        }
        return null; // No file uploaded, which is fine
    }

    // 1. Create upload folder if not exists
    $upload_dir = __DIR__ . '/uploads';
    if (!is_dir($upload_dir)) {
        if (!mkdir($upload_dir, 0755, true)) {
            $error = 'Failed to create uploads directory. Check directory permissions.';
            return false;
        }
    }

    // 2. Validate file size (5MB limit)
    $max_size = 5 * 1024 * 1024;
    if ($file['size'] > $max_size) {
        $error = 'File size is too large. Maximum size is 5MB.';
        return false;
    }

    // 3. Verify it is actually an image using mime type
    $file_info = getimagesize($file['tmp_name']);
    if ($file_info === false) {
        $error = 'The file is not a valid image.';
        return false;
    }

    $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $mime_type = $file_info['mime'];
    if (!in_array($mime_type, $allowed_types)) {
        $error = 'Unsupported file type. Only JPEG, PNG, GIF, and WEBP images are allowed.';
        return false;
    }

    // 4. Generate a unique name to prevent overwrite
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    if (empty($extension)) {
        // Fallback extension detection from mime
        $ext_map = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',
            'image/webp' => 'webp'
        ];
        $extension = $ext_map[$mime_type] ?? 'jpg';
    }

    $unique_name = 'cover_' . uniqid() . '.' . strtolower($extension);
    $dest_path = $upload_dir . '/' . $unique_name;

    // 5. Move file to upload directory
    if (move_uploaded_file($file['tmp_name'], $dest_path)) {
        return 'uploads/' . $unique_name;
    } else {
        $error = 'Failed to move uploaded file. Check server configuration.';
        return false;
    }
}
