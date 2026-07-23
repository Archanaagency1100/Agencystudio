<?php
/**
 * Studio925 Articles list
 */
$page_title = 'Articles';
require_once __DIR__ . '/partials/header.php';

$db = Database::getInstance();
$success_message = '';
$error_message = '';

$csrf_token = generate_csrf_token();

// Handle Delete Article
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
    if (!isset($_POST['csrf_token']) || !validate_csrf_token($_POST['csrf_token'])) {
        $error_message = 'Security token invalid. Please try again.';
    } else {
        $article_id = (int)($_POST['article_id'] ?? 0);
        try {
            // Fetch article slug/title to print in success alert and delete file if it exists
            $stmt = $db->prepare("SELECT title, cover_image FROM articles WHERE id = :id");
            $stmt->execute([':id' => $article_id]);
            $article = $stmt->fetch();

            if ($article) {
                // Delete cover image file if it is stored locally in uploads/
                if (!empty($article['cover_image']) && strpos($article['cover_image'], 'uploads/') === 0) {
                    $local_file = __DIR__ . '/' . $article['cover_image'];
                    if (file_exists($local_file)) {
                        @unlink($local_file);
                    }
                }

                $delete_stmt = $db->prepare("DELETE FROM articles WHERE id = :id");
                $delete_stmt->execute([':id' => $article_id]);
                $success_message = "Article '{$article['title']}' deleted successfully.";
            } else {
                $error_message = 'Article not found.';
            }
        } catch (PDOException $e) {
            $error_message = 'Database error: ' . $e->getMessage();
        }
    }
}

// Fetch articles with author name
try {
    $articles = $db->query("
        SELECT a.id, a.title, a.slug, a.status, a.cover_image, a.created_at, u.username as author_name 
        FROM articles a
        JOIN users u ON a.author_id = u.id
        ORDER BY a.id DESC
    ")->fetchAll();
} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?>

<div class="page-header">
    <div>
        <h1>Articles</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Manage blog posts, media releases, and SEO optimization metadata.</p>
    </div>
    <div>
        <a href="article-editor.php" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i>
            <span>New Article</span>
        </a>
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
                    <th style="width: 80px;">Cover</th>
                    <th>Title & Slug</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th style="width: 150px; text-align: right;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($articles)): ?>
                    <tr>
                        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                            <i class="fa-solid fa-newspaper" style="font-size: 2.5rem; color: #222; margin-bottom: 1rem; display: block;"></i>
                            No articles created yet. Get started by writing a new one!
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($articles as $article): ?>
                        <tr>
                            <td>
                                <div style="width: 60px; height: 40px; border-radius: 4px; overflow: hidden; background-color: #0d0d0d; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center;">
                                    <?php if (!empty($article['cover_image'])): ?>
                                        <img src="<?php echo escape($article['cover_image']); ?>" alt="Cover" style="width: 100%; height: 100%; object-fit: cover;">
                                    <?php else: ?>
                                        <i class="fa-solid fa-image" style="color: #222; font-size: 1.1rem;"></i>
                                    <?php endif; ?>
                                </div>
                            </td>
                            <td>
                                <div style="font-weight: 600; color: var(--text-light); font-size: 0.95rem;">
                                    <?php echo escape($article['title']); ?>
                                </div>
                                <span style="font-size: 0.75rem; color: var(--accent-gold);">
                                    /<?php echo escape($article['slug']); ?>
                                </span>
                            </td>
                            <td style="font-size: 0.85rem; color: var(--text-secondary);">
                                <?php echo escape($article['author_name']); ?>
                            </td>
                            <td>
                                <?php if ($article['status'] === 'Published'): ?>
                                    <span class="badge badge-success"><?php echo escape($article['status']); ?></span>
                                <?php else: ?>
                                    <span class="badge badge-warning"><?php echo escape($article['status']); ?></span>
                                <?php endif; ?>
                            </td>
                            <td style="font-size: 0.8rem; color: var(--text-muted);">
                                <?php echo date('M d, Y', strtotime($article['created_at'])); ?>
                            </td>
                            <td>
                                <div class="actions-cell" style="justify-content: flex-end;">
                                    <a href="article-editor.php?id=<?php echo (int)$article['id']; ?>" class="btn btn-secondary btn-sm" title="Edit Article">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <form action="articles.php" method="POST" onsubmit="return confirm('Are you sure you want to delete article \'<?php echo escape($article['title']); ?>\'?');" style="display:inline;">
                                        <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="article_id" value="<?php echo (int)$article['id']; ?>">
                                        <button type="submit" class="btn btn-danger btn-sm" title="Delete Article">
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

<?php 
require_once __DIR__ . '/partials/footer.php'; 
?>
