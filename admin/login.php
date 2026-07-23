<?php
/**
 * Studio925 Login Page
 */
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

// Redirect if already logged in
if (is_logged_in()) {
    header("Location: dashboard.php");
    exit();
}

$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username_or_email = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username_or_email) || empty($password)) {
        $error_message = 'Please enter both username/email and password.';
    } else {
        try {
            $db = Database::getInstance();
            // Allow logging in with either username or email
            $stmt = $db->prepare("SELECT * FROM users WHERE username = :login OR email = :login LIMIT 1");
            $stmt->execute([':login' => $username_or_email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                // Regenerate session ID to prevent session fixation
                session_regenerate_id(true);
                
                // Store user information in session
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];
                
                header("Location: dashboard.php");
                exit();
            } else {
                $error_message = 'Invalid username/email or password.';
            }
        } catch (PDOException $e) {
            $error_message = 'Database error occurred: ' . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Agencyeleven100 Admin</title>
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="auth-wrapper">

    <div class="auth-card">
        <div class="auth-header">
            <h1 class="auth-logo">Admin<span>Panel</span></h1>
            <p class="auth-subtitle">Creative Tech & Production Admin Portal</p>
        </div>

        <?php if (!empty($error_message)): ?>
            <div class="alert alert-danger">
                <i class="fa-solid fa-circle-exclamation" style="margin-right: 8px;"></i>
                <?php echo escape($error_message); ?>
            </div>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <div class="form-group">
                <label for="username" class="form-label">Username or Email</label>
                <div style="position: relative;">
                    <i class="fa-regular fa-user" style="position: absolute; left: 14px; top: 14px; color: var(--text-muted);"></i>
                    <input type="text" id="username" name="username" class="form-control" style="padding-left: 2.75rem;" required autofocus placeholder="Enter username or email">
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 2rem;">
                <label for="password" class="form-label">Password</label>
                <div style="position: relative;">
                    <i class="fa-regular fa-lock" style="position: absolute; left: 14px; top: 14px; color: var(--text-muted);"></i>
                    <input type="password" id="password" name="password" class="form-control" style="padding-left: 2.75rem;" required placeholder="Enter your password">
                </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; height: 46px;">
                <span>Sign In</span>
                <i class="fa-solid fa-right-to-bracket"></i>
            </button>
        </form>
    </div>

</body>
</html>
