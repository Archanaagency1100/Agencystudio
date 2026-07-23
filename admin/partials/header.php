<?php
/**
 * Studio925 Admin Panel Header & Sidebar Navigation
 */
require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../db.php';

// Enforce login for any page including this header
require_login();

// Get the current page filename to mark navigation item as active
$current_page = basename($_SERVER['PHP_SELF']);
$user_role = $_SESSION['user_role'] ?? 'Editor';
$user_name = $_SESSION['username'] ?? 'User';
$user_initial = strtoupper(substr($user_name, 0, 1));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo escape($page_title ?? 'Admin Panel'); ?> | Studio925</title>
    
    <!-- Font Awesome Icons (v6 CDN) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom Neo-Noir Admin Styling -->
    <link rel="stylesheet" href="assets/css/style.css">
    
    <?php if (isset($extra_css)): echo $extra_css; endif; ?>
</head>
<body>

    <!-- Admin Sidebar Navigation -->
    <aside class="admin-sidebar" id="sidebar">
        <div class="sidebar-brand">
            <a href="dashboard.php" class="brand-logo">Admin<span> 1100</span></a>
        </div>
        
        <ul class="sidebar-menu">
            <li class="menu-item <?php echo ($current_page == 'dashboard.php') ? 'active' : ''; ?>">
                <a href="dashboard.php">
                    <i class="fa-solid fa-gauge"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            
            <li class="menu-item <?php echo ($current_page == 'articles.php' || $current_page == 'article-editor.php') ? 'active' : ''; ?>">
                <a href="articles.php">
                    <i class="fa-solid fa-pen-nib"></i>
                    <span>Articles</span>
                </a>
            </li>
            
            <li class="menu-item <?php echo ($current_page == 'contacts.php') ? 'active' : ''; ?>">
                <a href="contacts.php">
                    <i class="fa-solid fa-envelope"></i>
                    <span>Contacts</span>
                </a>
            </li>
            
            <?php if ($user_role === 'Admin'): ?>
            <li class="menu-item <?php echo ($current_page == 'users.php') ? 'active' : ''; ?>">
                <a href="users.php">
                    <i class="fa-solid fa-users-gear"></i>
                    <span>User Management</span>
                </a>
            </li>
            <?php endif; ?>
        </ul>
        
        <div class="sidebar-footer">
            <p>&copy; 2026 Studio925</p>
        </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main">
        
        <!-- Top Navigation Header -->
        <header class="admin-header">
            <button class="toggle-sidebar" id="toggle-sidebar" aria-label="Toggle Sidebar">
                <i class="fa-solid fa-bars"></i>
            </button>
            
            <div class="header-user-info">
                <div class="user-avatar">
                    <?php echo escape($user_initial); ?>
                </div>
                <div class="user-details">
                    <span class="user-name"><?php echo escape($user_name); ?></span>
                    <span class="user-role"><?php echo escape($user_role); ?></span>
                </div>
                <a href="logout.php" class="btn btn-secondary btn-sm" title="Log Out" style="margin-left: 10px;">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </a>
            </div>
        </header>
        
        <!-- Main Panel Content -->
        <div class="content-wrapper">
