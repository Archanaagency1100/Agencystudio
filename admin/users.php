<?php
/**
 * Studio925 User Management Module
 */
$page_title = 'User Management';
require_once __DIR__ . '/partials/header.php';

// Enforce Admin-only access
require_admin();

$db = Database::getInstance();
$success_message = '';
$error_message = '';

$csrf_token = generate_csrf_token();

// Handle Form Submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CSRF Token Validation
    if (!isset($_POST['csrf_token']) || !validate_csrf_token($_POST['csrf_token'])) {
        $error_message = 'Security token invalid. Please try again.';
    } else {
        $action = $_POST['action'] ?? '';

        // ADD USER ACTION
        if ($action === 'add') {
            $username = trim($_POST['username'] ?? '');
            $email = trim($_POST['email'] ?? '');
            $phone = trim($_POST['phone'] ?? '');
            $password = $_POST['password'] ?? '';
            $role = $_POST['role'] ?? 'Editor';

            if (empty($username) || empty($email) || empty($password)) {
                $error_message = 'Username, email, and password are required.';
            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $error_message = 'Invalid email address format.';
            } else {
                try {
                    // Check if username or email already exists
                    $check_stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE username = :username OR email = :email");
                    $check_stmt->execute([':username' => $username, ':email' => $email]);
                    
                    if ($check_stmt->fetchColumn() > 0) {
                        $error_message = 'Username or email already exists in the system.';
                    } else {
                        // Insert new user
                        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                        $insert_stmt = $db->prepare("
                            INSERT INTO users (username, email, phone, password, role)
                            VALUES (:username, :email, :phone, :password, :role)
                        ");
                        $insert_stmt->execute([
                            ':username' => $username,
                            ':email' => $email,
                            ':phone' => $phone,
                            ':password' => $hashed_password,
                            ':role' => $role
                        ]);
                        $success_message = "User '{$username}' added successfully.";
                    }
                } catch (PDOException $e) {
                    $error_message = 'Database error: ' . $e->getMessage();
                }
            }
        }
        
        // EDIT USER ACTION
        elseif ($action === 'edit') {
            $user_id = (int)($_POST['user_id'] ?? 0);
            $email = trim($_POST['email'] ?? '');
            $phone = trim($_POST['phone'] ?? '');
            $role = $_POST['role'] ?? 'Editor';
            $password = $_POST['password'] ?? ''; // Optional password update

            if (empty($email)) {
                $error_message = 'Email field is required.';
            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $error_message = 'Invalid email address format.';
            } else {
                try {
                    // Check if email belongs to someone else
                    $check_stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE email = :email AND id != :id");
                    $check_stmt->execute([':email' => $email, ':id' => $user_id]);
                    
                    if ($check_stmt->fetchColumn() > 0) {
                        $error_message = 'Email address is already in use by another user.';
                    } else {
                        // Update basic info
                        if (!empty($password)) {
                            // Update including new password
                            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                            $update_stmt = $db->prepare("
                                UPDATE users 
                                SET email = :email, phone = :phone, role = :role, password = :password 
                                WHERE id = :id
                            ");
                            $update_stmt->execute([
                                ':email' => $email,
                                ':phone' => $phone,
                                ':role' => $role,
                                ':password' => $hashed_password,
                                ':id' => $user_id
                            ]);
                        } else {
                            // Update excluding password
                            $update_stmt = $db->prepare("
                                UPDATE users 
                                SET email = :email, phone = :phone, role = :role 
                                WHERE id = :id
                            ");
                            $update_stmt->execute([
                                ':email' => $email,
                                ':phone' => $phone,
                                ':role' => $role,
                                ':id' => $user_id
                            ]);
                        }
                        
                        // If current logged in user edited their own details, update session role
                        if ($user_id === $_SESSION['user_id']) {
                            $_SESSION['user_role'] = $role;
                        }
                        
                        $success_message = 'User details updated successfully.';
                    }
                } catch (PDOException $e) {
                    $error_message = 'Database error: ' . $e->getMessage();
                }
            }
        }

        // DELETE USER ACTION
        elseif ($action === 'delete') {
            $user_id = (int)($_POST['user_id'] ?? 0);

            if ($user_id === $_SESSION['user_id']) {
                $error_message = 'You cannot delete your own logged-in account.';
            } else {
                try {
                    // Prevent deleting the last Admin
                    $role_stmt = $db->prepare("SELECT role, username FROM users WHERE id = :id");
                    $role_stmt->execute([':id' => $user_id]);
                    $user_to_delete = $role_stmt->fetch();

                    if ($user_to_delete && $user_to_delete['role'] === 'Admin') {
                        $admin_count = $db->query("SELECT COUNT(*) FROM users WHERE role = 'Admin'")->fetchColumn();
                        if ($admin_count <= 1) {
                            $error_message = 'Cannot delete the only administrator remaining in the system.';
                            $user_to_delete = null;
                        }
                    }

                    if ($user_to_delete) {
                        $delete_stmt = $db->prepare("DELETE FROM users WHERE id = :id");
                        $delete_stmt->execute([':id' => $user_id]);
                        $success_message = "User '{$user_to_delete['username']}' deleted successfully.";
                    }
                } catch (PDOException $e) {
                    $error_message = 'Database error: ' . $e->getMessage();
                }
            }
        }
    }
}

// Fetch all users
try {
    $users = $db->query("SELECT id, username, email, phone, role, created_at FROM users ORDER BY id ASC")->fetchAll();
} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>

<div class="page-header">
    <div>
        <h1>User Management</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Manage administrators and content editors for Studio925.</p>
    </div>
    <div>
        <button class="btn btn-primary" onclick="openAddModal()">
            <i class="fa-solid fa-user-plus"></i>
            <span>Add User</span>
        </button>
    </div>
</div>

<?php if (!empty($success_message)): ?>
    <div class="alert alert-success">
        <i class="fa-solid fa-circle-check" style="margin-right: 8px;"></i>
        <?php echo escape($success_message); ?>
    </div>
<?php endif; ?>

<?php if (!empty($error_message)): ?>
    <div class="alert alert-danger">
        <i class="fa-solid fa-circle-exclamation" style="margin-right: 8px;"></i>
        <?php echo escape($error_message); ?>
    </div>
<?php endif; ?>

<!-- Users List Panel -->
<div class="panel">
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th style="width: 150px; text-align: right;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($users as $user): ?>
                    <tr>
                        <td><?php echo (int)$user['id']; ?></td>
                        <td>
                            <div style="font-weight: 600; color: var(--text-light);"><?php echo escape($user['username']); ?></div>
                        </td>
                        <td><?php echo escape($user['email']); ?></td>
                        <td><?php echo escape($user['phone'] ?: 'N/A'); ?></td>
                        <td>
                            <?php if ($user['role'] === 'Admin'): ?>
                                <span class="badge badge-success"><i class="fa-solid fa-shield-halved" style="margin-right: 4px;"></i><?php echo escape($user['role']); ?></span>
                            <?php else: ?>
                                <span class="badge badge-info"><i class="fa-solid fa-pen" style="margin-right: 4px;"></i><?php echo escape($user['role']); ?></span>
                            <?php endif; ?>
                        </td>
                        <td style="font-size: 0.85rem; color: var(--text-muted);">
                            <?php echo date('M d, Y', strtotime($user['created_at'])); ?>
                        </td>
                        <td>
                            <div class="actions-cell" style="justify-content: flex-end;">
                                <button class="btn btn-secondary btn-sm" title="Edit User" 
                                        onclick="openEditModal(<?php echo (int)$user['id']; ?>, '<?php echo escape($user['username']); ?>', '<?php echo escape($user['email']); ?>', '<?php echo escape($user['phone']); ?>', '<?php echo escape($user['role']); ?>')">
                                    <i class="fa-solid fa-user-pen"></i>
                                </button>
                                <?php if ($user['id'] !== $_SESSION['user_id']): ?>
                                    <form action="users.php" method="POST" onsubmit="return confirm('Are you sure you want to delete user \'<?php echo escape($user['username']); ?>\'?');" style="display:inline;">
                                        <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="user_id" value="<?php echo (int)$user['id']; ?>">
                                        <button type="submit" class="btn btn-danger btn-sm" title="Delete User">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </form>
                                <?php endif; ?>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- ================= ADD USER MODAL ================= -->
<div class="modal-overlay" id="addUserModal">
    <div class="modal-container">
        <div class="modal-header">
            <h3 class="modal-title"><i class="fa-solid fa-user-plus" style="color: var(--accent-gold); margin-right: 10px;"></i>Add New User</h3>
            <button class="modal-close" onclick="closeAddModal()">&times;</button>
        </div>
        <form action="users.php" method="POST">
            <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
            <input type="hidden" name="action" value="add">
            
            <div class="modal-body">
                <div class="form-group">
                    <label for="add_username" class="form-label">Username</label>
                    <input type="text" id="add_username" name="username" class="form-control" required placeholder="Enter username">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="add_email" class="form-label">Email Address</label>
                        <input type="email" id="add_email" name="email" class="form-control" required placeholder="name@studio925.com">
                    </div>
                    <div class="form-group">
                        <label for="add_phone" class="form-label">Phone Number</label>
                        <input type="text" id="add_phone" name="phone" class="form-control" placeholder="+91 98765 43210">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="add_password" class="form-label">Password</label>
                        <input type="password" id="add_password" name="password" class="form-control" required placeholder="Enter temporary password">
                    </div>
                    <div class="form-group">
                        <label for="add_role" class="form-label">Role</label>
                        <select id="add_role" name="role" class="form-control">
                            <option value="Editor">Editor (Write / Edit Articles)</option>
                            <option value="Admin">Admin (Full Control)</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeAddModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Create User</button>
            </div>
        </form>
    </div>
</div>

<!-- ================= EDIT USER MODAL ================= -->
<div class="modal-overlay" id="editUserModal">
    <div class="modal-container">
        <div class="modal-header">
            <h3 class="modal-title"><i class="fa-solid fa-user-pen" style="color: var(--accent-gold); margin-right: 10px;"></i>Edit User Details</h3>
            <button class="modal-close" onclick="closeEditModal()">&times;</button>
        </div>
        <form action="users.php" method="POST">
            <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
            <input type="hidden" name="action" value="edit">
            <input type="hidden" name="user_id" id="edit_user_id">
            
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Username</label>
                    <input type="text" id="edit_username_display" class="form-control" disabled style="opacity: 0.6; cursor: not-allowed;">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Usernames cannot be changed.</span>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit_email" class="form-label">Email Address</label>
                        <input type="email" id="edit_email" name="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="edit_phone" class="form-label">Phone Number</label>
                        <input type="text" id="edit_phone" name="phone" class="form-control">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit_password" class="form-label">New Password (Optional)</label>
                        <input type="password" id="edit_password" name="password" class="form-control" placeholder="Leave blank to keep current password">
                    </div>
                    <div class="form-group">
                        <label for="edit_role" class="form-label">Role</label>
                        <select id="edit_role" name="role" class="form-control">
                            <option value="Editor">Editor (Write / Edit Articles)</option>
                            <option value="Admin">Admin (Full Control)</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeEditModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    </div>
</div>

<?php 
// Inject modal scripts in footer
$extra_js = "
<script>
    const addModal = document.getElementById('addUserModal');
    const editModal = document.getElementById('editUserModal');

    function openAddModal() {
        addModal.classList.add('active');
    }
    function closeAddModal() {
        addModal.classList.remove('active');
        document.getElementById('add_username').value = '';
        document.getElementById('add_email').value = '';
        document.getElementById('add_phone').value = '';
        document.getElementById('add_password').value = '';
    }

    function openEditModal(id, username, email, phone, role) {
        document.getElementById('edit_user_id').value = id;
        document.getElementById('edit_username_display').value = username;
        document.getElementById('edit_email').value = email;
        document.getElementById('edit_phone').value = phone;
        document.getElementById('edit_role').value = role;
        editModal.classList.add('active');
    }
    function closeEditModal() {
        editModal.classList.remove('active');
        document.getElementById('edit_password').value = '';
    }
</script>
";

require_once __DIR__ . '/partials/footer.php'; 
?>
