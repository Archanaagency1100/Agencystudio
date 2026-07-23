<?php
/**
 * Studio925 Contact Form Enquiries Manager
 */
$page_title = 'Contact Enquiries';
require_once __DIR__ . '/partials/header.php';

$db = Database::getInstance();
$success_message = '';
$error_message = '';

$csrf_token = generate_csrf_token();

// Handle Admin Note & Status Updates
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || !validate_csrf_token($_POST['csrf_token'])) {
        $error_message = 'Security token invalid. Please try again.';
    } else {
        $action = $_POST['action'] ?? '';

        if ($action === 'update') {
            $contact_id = (int)($_POST['contact_id'] ?? 0);
            $status = $_POST['status'] ?? 'Pending';
            $admin_note = trim($_POST['admin_note'] ?? '');

            try {
                $update_stmt = $db->prepare("
                    UPDATE contacts 
                    SET status = :status, admin_note = :admin_note 
                    WHERE id = :id
                ");
                $update_stmt->execute([
                    ':status' => $status,
                    ':admin_note' => $admin_note,
                    ':id' => $contact_id
                ]);
                $success_message = 'Enquiry updated successfully.';
            } catch (PDOException $e) {
                $error_message = 'Database error: ' . $e->getMessage();
            }
        }
        
        elseif ($action === 'delete') {
            $contact_id = (int)($_POST['contact_id'] ?? 0);
            try {
                $delete_stmt = $db->prepare("DELETE FROM contacts WHERE id = :id");
                $delete_stmt->execute([':id' => $contact_id]);
                $success_message = 'Enquiry log deleted successfully.';
            } catch (PDOException $e) {
                $error_message = 'Database error: ' . $e->getMessage();
            }
        }
    }
}

// Fetch all inquiries
try {
    $contacts = $db->query("SELECT * FROM contacts ORDER BY status = 'Pending' DESC, id DESC")->fetchAll();
} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>

<div class="page-header">
    <div>
        <h1>Contact Enquiries</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">View booking inquiries and manage communications logs.</p>
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

<div class="panel">
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>IP Address</th>
                    <th>Status</th>
                    <th style="width: 150px; text-align: right;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($contacts)): ?>
                    <tr>
                        <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                            <i class="fa-solid fa-envelope-open" style="font-size: 2.5rem; color: #222; margin-bottom: 1rem; display: block;"></i>
                            No contact inquiries logged yet.
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($contacts as $contact): ?>
                        <tr style="<?php echo ($contact['status'] === 'Pending') ? 'border-left: 3px solid var(--accent-gold);' : ''; ?>">
                            <td style="font-size: 0.85rem; color: var(--text-muted);">
                                <?php echo date('M d, Y H:i', strtotime($contact['created_at'])); ?>
                            </td>
                            <td>
                                <div style="font-weight: 600; color: var(--text-light);"><?php echo escape($contact['name']); ?></div>
                            </td>
                            <td><?php echo escape($contact['email']); ?></td>
                            <td><?php echo escape($contact['contact']); ?></td>
                            <td style="font-family: monospace; font-size: 0.85rem;"><?php echo escape($contact['ip_address']); ?></td>
                            <td>
                                <?php 
                                $statusClass = 'badge-warning';
                                if ($contact['status'] === 'Read') $statusClass = 'badge-info';
                                if ($contact['status'] === 'Replied') $statusClass = 'badge-success';
                                ?>
                                <span class="badge <?php echo $statusClass; ?>">
                                    <?php echo escape($contact['status']); ?>
                                </span>
                            </td>
                            <td>
                                <div class="actions-cell" style="justify-content: flex-end;">
                                    <button class="btn btn-secondary btn-sm" title="View Enquiry details"
                                            onclick="openDetailModal(<?php echo (int)$contact['id']; ?>, '<?php echo escape(addslashes($contact['name'])); ?>', '<?php echo escape($contact['email']); ?>', '<?php echo escape($contact['contact']); ?>', '<?php echo escape(addslashes($contact['message'])); ?>', '<?php echo escape($contact['ip_address']); ?>', '<?php echo escape($contact['status']); ?>', '<?php echo escape(addslashes($contact['admin_note'])); ?>')">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    <form action="contacts.php" method="POST" onsubmit="return confirm('Are you sure you want to delete this enquiry history log?');" style="display:inline;">
                                        <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="contact_id" value="<?php echo (int)$contact['id']; ?>">
                                        <button type="submit" class="btn btn-danger btn-sm" title="Delete Enquiry Log">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- ================= ENQUIRY DETAIL & NOTES MODAL ================= -->
<div class="modal-overlay" id="detailModal">
    <div class="modal-container">
        <div class="modal-header">
            <h3 class="modal-title"><i class="fa-solid fa-envelope" style="color: var(--accent-gold); margin-right: 10px;"></i>Enquiry Details</h3>
            <button class="modal-close" onclick="closeDetailModal()">&times;</button>
        </div>
        <form action="contacts.php" method="POST">
            <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="contact_id" id="modal_contact_id">
            
            <div class="modal-body" style="max-height: 450px; overflow-y: auto;">
                <div class="form-row" style="margin-bottom: 1rem;">
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Sender Name</span>
                        <strong id="modal_name" style="color: var(--text-light);">John Doe</strong>
                    </div>
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Email Address</span>
                        <strong id="modal_email" style="color: var(--text-light);">john@example.com</strong>
                    </div>
                </div>

                <div class="form-row" style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Phone Contact</span>
                        <strong id="modal_contact" style="color: var(--text-light);">+91 99999 99999</strong>
                    </div>
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Sender IP Address</span>
                        <code id="modal_ip" style="color: var(--accent-gold); font-size: 0.9rem;">127.0.0.1</code>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Message Content</label>
                    <div id="modal_message" style="background-color: #0b0b0b; border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; color: var(--text-light); white-space: pre-wrap; font-size: 0.95rem; line-height: 1.5;">
                        Sender message appears here...
                    </div>
                </div>

                <div class="form-row" style="margin-top: 1.5rem;">
                    <div class="form-group">
                        <label for="modal_status" class="form-label">Follow-up Status</label>
                        <select id="modal_status" name="status" class="form-control">
                            <option value="Pending">Pending</option>
                            <option value="Read">Read</option>
                            <option value="Replied">Replied</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="modal_admin_note" class="form-label">Admin Follow-up Notes</label>
                    <textarea id="modal_admin_note" name="admin_note" class="form-control" placeholder="Type internal action/response notes here (e.g. Called sender on May 27, scheduled studio tour)..."></textarea>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeDetailModal()">Close</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    </div>
</div>

<?php 
// Inject detail modal scripts in footer
$extra_js = "
<script>
    const detailModal = document.getElementById('detailModal');

    function openDetailModal(id, name, email, contact, message, ip, status, adminNote) {
        document.getElementById('modal_contact_id').value = id;
        document.getElementById('modal_name').textContent = name;
        document.getElementById('modal_email').textContent = email;
        document.getElementById('modal_contact').textContent = contact;
        document.getElementById('modal_ip').textContent = ip;
        document.getElementById('modal_message').textContent = message || '[No message provided]';
        document.getElementById('modal_status').value = status;
        document.getElementById('modal_admin_note').value = adminNote;
        
        detailModal.classList.add('active');
    }
    
    function closeDetailModal() {
        detailModal.classList.remove('active');
    }
</script>
";

require_once __DIR__ . '/partials/footer.php'; 
?>
