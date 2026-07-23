<?php
/**
 * Studio925 Admin Dashboard
 */
$page_title = 'Dashboard';
require_once __DIR__ . '/partials/header.php';

try {
    $db = Database::getInstance();

    // Fetch metric counts
    $total_articles = $db->query("SELECT COUNT(*) FROM articles")->fetchColumn();
    $pending_contacts = $db->query("SELECT COUNT(*) FROM contacts WHERE status = 'Pending'")->fetchColumn();
    $total_contacts = $db->query("SELECT COUNT(*) FROM contacts")->fetchColumn();
    $total_users = $db->query("SELECT COUNT(*) FROM users")->fetchColumn();

    // Fetch recent contacts
    $recent_contacts_stmt = $db->query("SELECT * FROM contacts ORDER BY id DESC LIMIT 5");
    $recent_contacts = $recent_contacts_stmt->fetchAll();

    // Fetch recent articles
    $recent_articles_stmt = $db->query("
        SELECT a.*, u.username as author_name 
        FROM articles a 
        JOIN users u ON a.author_id = u.id 
        ORDER BY a.id DESC LIMIT 5
    ");
    $recent_articles = $recent_articles_stmt->fetchAll();

} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>

<div class="page-header">
    <div>
        <h1>Dashboard</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Overview of Studio925 media operations, logs, and articles.</p>
    </div>
    <div>
        <a href="article-editor.php" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i>
            <span>New Article</span>
        </a>
    </div>
</div>

<!-- Stats Counter Grid -->
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-content">
            <h3><?php echo (int)$total_articles; ?></h3>
            <p>Articles Published</p>
        </div>
        <div class="stat-icon">
            <i class="fa-solid fa-newspaper"></i>
        </div>
    </div>

    <div class="stat-card">
        <div class="stat-content">
            <h3><?php echo (int)$pending_contacts; ?></h3>
            <p>Pending Contacts</p>
        </div>
        <div class="stat-icon" style="color: <?php echo ($pending_contacts > 0) ? 'var(--accent-gold)' : 'var(--text-muted)'; ?>;">
            <i class="fa-solid fa-envelope-open-text"></i>
        </div>
    </div>

    <div class="stat-card">
        <div class="stat-content">
            <h3><?php echo (int)$total_contacts; ?></h3>
            <p>Total Leads</p>
        </div>
        <div class="stat-icon">
            <i class="fa-solid fa-address-book"></i>
        </div>
    </div>

    <div class="stat-card">
        <div class="stat-content">
            <h3><?php echo (int)$total_users; ?></h3>
            <p>System Admins</p>
        </div>
        <div class="stat-icon">
            <i class="fa-solid fa-users"></i>
        </div>
    </div>
</div>

<div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));">
    <!-- Recent Contact Inquiries Panel -->
    <div class="panel">
        <div class="panel-header">
            <h2 class="panel-title">Recent Enquiries</h2>
            <a href="contacts.php" class="btn btn-secondary btn-sm">View All</a>
        </div>
        
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($recent_contacts)): ?>
                        <tr>
                            <td colspan="3" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                                No recent contact inquiries found.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($recent_contacts as $contact): ?>
                            <tr>
                                <td>
                                    <div style="font-weight: 600; color: var(--text-light);"><?php echo escape($contact['name']); ?></div>
                                    <span style="font-size: 0.8rem; color: var(--text-muted);"><?php echo escape($contact['email']); ?></span>
                                </td>
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
                                <td style="font-size: 0.8rem; color: var(--text-muted);">
                                    <?php echo date('M d, Y', strtotime($contact['created_at'])); ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Recent Articles Panel -->
    <div class="panel">
        <div class="panel-header">
            <h2 class="panel-title">Recent Articles</h2>
            <a href="articles.php" class="btn btn-secondary btn-sm">View All</a>
        </div>
        
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($recent_articles)): ?>
                        <tr>
                            <td colspan="3" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                                No articles created yet.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($recent_articles as $article): ?>
                            <tr>
                                <td>
                                    <div style="font-weight: 600; color: var(--text-light); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                        <?php echo escape($article['title']); ?>
                                    </div>
                                    <span style="font-size: 0.75rem; color: var(--accent-gold);">
                                        /<?php echo escape($article['slug']); ?>
                                    </span>
                                </td>
                                <td style="font-size: 0.85rem;">
                                    <?php echo escape($article['author_name']); ?>
                                </td>
                                <td>
                                    <?php 
                                    $statusClass = ($article['status'] === 'Published') ? 'badge-success' : 'badge-warning';
                                    ?>
                                    <span class="badge <?php echo $statusClass; ?>">
                                        <?php echo escape($article['status']); ?>
                                    </span>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php 
require_once __DIR__ . '/partials/footer.php'; 
?>
