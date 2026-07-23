<?php
/**
 * Studio925 Article Editor (Create / Edit Article)
 */
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/upload-handler.php';

$db = Database::getInstance();
$error_message = '';
$success_message = '';

$article_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$is_edit = ($article_id > 0);

// Default Article values
$article = [
    'title' => '',
    'slug' => '',
    'content' => '',
    'cover_image' => '',
    'meta_title' => '',
    'meta_description' => '',
    'meta_keywords' => '',
    'status' => 'Draft'
];

// If editing, fetch existing article
if ($is_edit) {
    try {
        $stmt = $db->prepare("SELECT * FROM articles WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $article_id]);
        $fetched_article = $stmt->fetch();
        if ($fetched_article) {
            $article = $fetched_article;
        } else {
            header("Location: articles.php?error=notfound");
            exit();
        }
    } catch (PDOException $e) {
        $error_message = 'Database error: ' . $e->getMessage();
    }
}

// Handle Save Action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || !validate_csrf_token($_POST['csrf_token'])) {
        $error_message = 'Security token invalid. Please try again.';
    } else {
        // Collect form data
        $title = trim($_POST['title'] ?? '');
        $slug = trim($_POST['slug'] ?? '');
        $content = trim($_POST['content'] ?? '');
        $cover_image_url = trim($_POST['cover_image_url'] ?? '');
        $meta_title = trim($_POST['meta_title'] ?? '');
        $meta_description = trim($_POST['meta_description'] ?? '');
        $meta_keywords = trim($_POST['meta_keywords'] ?? '');
        $status = $_POST['status'] ?? 'Draft';
        $author_id = $_SESSION['user_id'];

        // Auto-generate slug from title if empty
        if (empty($slug)) {
            $slug = strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $title));
            $slug = trim($slug, '-');
        } else {
            $slug = strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $slug));
            $slug = trim($slug, '-');
        }

        // Validate mandatory inputs
        if (empty($title)) {
            $error_message = 'Article Title is required.';
        } elseif (empty($content) || $content === '<p><br></p>') {
            $error_message = 'Article Content is required.';
        } else {
            // Handle Cover Image upload if provided
            $cover_image = $article['cover_image']; // Keep current image as fallback
            if (isset($_FILES['cover_image_file'])) {
                $upload_error = '';
                $uploaded_path = handle_image_upload($_FILES['cover_image_file'], $upload_error);
                
                if ($uploaded_path === false) {
                    $error_message = $upload_error;
                } elseif ($uploaded_path !== null) {
                    $cover_image = $uploaded_path;
                }
            }
            
            // If text input URL is provided and no file was uploaded, use the URL
            if (empty($error_message) && !empty($cover_image_url) && (!isset($_FILES['cover_image_file']) || $_FILES['cover_image_file']['error'] === UPLOAD_ERR_NO_FILE)) {
                $cover_image = $cover_image_url;
            }

            if (empty($error_message)) {
                try {
                    // Check slug uniqueness
                    $slug_stmt = $db->prepare("SELECT COUNT(*) FROM articles WHERE slug = :slug AND id != :id");
                    $slug_stmt->execute([':slug' => $slug, ':id' => $article_id]);
                    
                    if ($slug_stmt->fetchColumn() > 0) {
                        // Slug duplicate, automatically append timestamp/random string to make it unique
                        $slug = $slug . '-' . time();
                    }

                    if ($is_edit) {
                        // UPDATE Article
                        $update_stmt = $db->prepare("
                            UPDATE articles 
                            SET title = :title, slug = :slug, content = :content, cover_image = :cover_image,
                                meta_title = :meta_title, meta_description = :meta_description, meta_keywords = :meta_keywords,
                                status = :status, updated_at = CURRENT_TIMESTAMP
                            WHERE id = :id
                        ");
                        $update_stmt->execute([
                            ':title' => $title,
                            ':slug' => $slug,
                            ':content' => $content,
                            ':cover_image' => $cover_image,
                            ':meta_title' => $meta_title,
                            ':meta_description' => $meta_description,
                            ':meta_keywords' => $meta_keywords,
                            ':status' => $status,
                            ':id' => $article_id
                        ]);
                        
                        $success_message = 'Article updated successfully.';
                        // Reload editing values
                        $article['title'] = $title;
                        $article['slug'] = $slug;
                        $article['content'] = $content;
                        $article['cover_image'] = $cover_image;
                        $article['meta_title'] = $meta_title;
                        $article['meta_description'] = $meta_description;
                        $article['meta_keywords'] = $meta_keywords;
                        $article['status'] = $status;

                    } else {
                        // INSERT Article
                        $insert_stmt = $db->prepare("
                            INSERT INTO articles (title, slug, content, cover_image, meta_title, meta_description, meta_keywords, status, author_id)
                            VALUES (:title, :slug, :content, :cover_image, :meta_title, :meta_description, :meta_keywords, :status, :author_id)
                        ");
                        $insert_stmt->execute([
                            ':title' => $title,
                            ':slug' => $slug,
                            ':content' => $content,
                            ':cover_image' => $cover_image,
                            ':meta_title' => $meta_title,
                            ':meta_description' => $meta_description,
                            ':meta_keywords' => $meta_keywords,
                            ':status' => $status,
                            ':author_id' => $author_id
                        ]);
                        
                        $new_id = $db->lastInsertId();
                        header("Location: article-editor.php?id=" . $new_id . "&success=created");
                        exit();
                    }
                } catch (PDOException $e) {
                    $error_message = 'Database error: ' . $e->getMessage();
                }
            }
        }
    }
}

// Success message check via redirect URL query param
if (isset($_GET['success']) && $_GET['success'] === 'created') {
    $success_message = 'Article created successfully!';
}

// Header styling for Quill Editor
$extra_css = '
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
';

$page_title = $is_edit ? 'Edit Article' : 'New Article';
require_once __DIR__ . '/partials/header.php';
?>

<div class="page-header">
    <div>
        <h1><?php echo $is_edit ? 'Edit Article' : 'Write New Article'; ?></h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">
            <?php echo $is_edit ? 'Modifying post: ' . escape($article['title']) : 'Draft a new multimedia release.'; ?>
        </p>
    </div>
    <div>
        <a href="articles.php" class="btn btn-secondary">
            <i class="fa-solid fa-arrow-left"></i>
            <span>All Articles</span>
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

<form action="article-editor.php?id=<?php echo (int)$article_id; ?>" method="POST" enctype="multipart/form-data" id="articleForm">
    <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
    
    <div class="form-row" style="grid-template-columns: 2fr 1fr; align-items: start; gap: 2rem;">
        
        <!-- Left Side: Core content form -->
        <div class="panel" style="margin-bottom: 0;">
            <div class="form-group">
                <label for="title" class="form-label">Article Title</label>
                <input type="text" id="title" name="title" class="form-control" style="font-size: 1.1rem; font-weight: 600;" required value="<?php echo escape($article['title']); ?>" placeholder="Enter a captivating title...">
            </div>

            <div class="form-group">
                <label for="slug" class="form-label">URL Slug</label>
                <div style="position: relative;">
                    <span style="position: absolute; left: 14px; top: 12px; color: var(--text-muted); font-size: 0.9rem;">/articles/</span>
                    <input type="text" id="slug" name="slug" class="form-control" style="padding-left: 5rem;" value="<?php echo escape($article['slug']); ?>" placeholder="auto-generated-slug-from-title">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Article Content</label>
                <!-- Quill Container -->
                <div id="editor-container" style="height:500px ; overflow-y:scroll;"><?php echo $article['content']; ?></div>
                <input type="hidden" name="content" id="content-input">
            </div>

            <!-- Cover Image selector -->
            <div class="form-group" style="margin-top: 1.5rem;">
                <label class="form-label">Cover Image</label>
                <div class="file-upload-wrapper">
                    <div class="image-preview-box" id="imagePreview">
                        <?php if (!empty($article['cover_image'])): ?>
                            <img src="<?php echo escape($article['cover_image']); ?>" alt="Cover Preview">
                        <?php else: ?>
                            <i class="fa-solid fa-image"></i>
                        <?php endif; ?>
                    </div>
                    
                    <div style="flex-grow: 1;">
                        <input type="file" name="cover_image_file" id="cover_image_file" class="form-control" accept="image/*" style="margin-bottom: 0.5rem; padding: 0.5rem;">
                        <input type="text" name="cover_image_url" id="cover_image_url" class="form-control" placeholder="Or paste external image URL..." value="<?php echo (!empty($article['cover_image']) && strpos($article['cover_image'], 'uploads/') !== 0) ? escape($article['cover_image']) : ''; ?>">
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Side: SEO panel, status, and Google Preview -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Settings panel -->
            <div class="panel" style="margin-bottom: 0;">
                <h3 class="panel-title" style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">Publish Status</h3>
                
                <div class="form-group">
                    <label for="status" class="form-label">Visibility</label>
                    <select id="status" name="status" class="form-control">
                        <option value="Draft" <?php echo ($article['status'] === 'Draft') ? 'selected' : ''; ?>>Draft</option>
                        <option value="Published" <?php echo ($article['status'] === 'Published') ? 'selected' : ''; ?>>Published</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                    <i class="fa-solid fa-save"></i>
                    <span>Save Article</span>
                </button>
            </div>

            <!-- SEO & Meta Tags Panel -->
            <div class="panel" style="margin-bottom: 0;">
                <h3 class="panel-title" style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">SEO Optimization</h3>
                
                <div class="form-group">
                    <label for="meta_title" class="form-label">Meta Title</label>
                    <input type="text" id="meta_title" name="meta_title" class="form-control" value="<?php echo escape($article['meta_title']); ?>" placeholder="Google title link (falls back to Title)">
                </div>

                <div class="form-group">
                    <label for="meta_description" class="form-label">Meta Description</label>
                    <textarea id="meta_description" name="meta_description" class="form-control" maxlength="255" placeholder="Short description shown in search results..."><?php echo escape($article['meta_description']); ?></textarea>
                    <div style="text-align: right; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;" id="desc_counter">0/255 characters</div>
                </div>

                <div class="form-group">
                    <label for="meta_keywords" class="form-label">Meta Keywords</label>
                    <input type="text" id="meta_keywords" name="meta_keywords" class="form-control" value="<?php echo escape($article['meta_keywords']); ?>" placeholder="media, studio rental, chroma">
                </div>

                <!-- Google Search Snippet Preview -->
                <div class="form-group" style="margin-top: 1.5rem;">
                    <label class="form-label">Search Snippet Preview</label>
                    <div class="seo-preview-card">
                        <div class="seo-preview-title" id="seoTitlePreview">Google Search Preview Title</div>
                        <div class="seo-preview-url" id="seoUrlPreview">http://localhost:8000/articles/...</div>
                        <div class="seo-preview-desc" id="seoDescPreview">Write a snippet description above to verify SEO formatting...</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</form>

<?php
// Quill rich text scripts and SEO preview updates
$extra_js = '
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
<script>
    // Initialize Quill Editor
    const quill = new Quill("#editor-container", {
        theme: "snow",
        placeholder: "Write your article content with layouts, formatting, links, and lists...",
        modules: {
            toolbar: [
                [{ "header": [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ "color": [] }, { "background": [] }],
                [{ "list": "ordered" }, { "list": "bullet" }],
                ["link", "image", "video"],
                ["clean"]
            ]
        }
    });

    // Populate Quill content to hidden form input before submission
    const form = document.getElementById("articleForm");
    form.onsubmit = function() {
        const contentInput = document.getElementById("content-input");
        contentInput.value = quill.root.innerHTML;
        return true;
    };

    // Auto generate URL slug from Article Title
    const titleInput = document.getElementById("title");
    const slugInput = document.getElementById("slug");

    titleInput.addEventListener("input", function() {
        if (' . ($is_edit ? 'false' : 'true') . ' || slugInput.value === "") {
            let slug = titleInput.value
                .toLowerCase()
                .replace(/[^a-z0-9\\s-]/g, "")
                .replace(/\\s+/g, "-")
                .replace(/-+/g, "-")
                .trim();
            slugInput.value = slug;
            updateSeoPreview();
        }
    });

    // File upload local preview
    const fileInput = document.getElementById("cover_image_file");
    const urlInput = document.getElementById("cover_image_url");
    const previewBox = document.getElementById("imagePreview");

    fileInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewBox.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
            urlInput.value = ""; // clear URL field when local file is chosen
        }
    });

    // Handle typing in Image URL field
    urlInput.addEventListener("input", function() {
        if (urlInput.value.trim() !== "") {
            previewBox.innerHTML = `<img src="${urlInput.value}" alt="Preview">`;
            fileInput.value = ""; // clear local file select
        } else {
            previewBox.innerHTML = `<i class="fa-solid fa-image"></i>`;
        }
    });

    // Update Google SEO Snippet Preview
    const metaTitleInput = document.getElementById("meta_title");
    const metaDescInput = document.getElementById("meta_description");
    const descCounter = document.getElementById("desc_counter");

    const seoTitlePreview = document.getElementById("seoTitlePreview");
    const seoUrlPreview = document.getElementById("seoUrlPreview");
    const seoDescPreview = document.getElementById("seoDescPreview");

    function updateSeoPreview() {
        // Update Title preview (fallback to title)
        let displayTitle = metaTitleInput.value.trim() || titleInput.value.trim() || "Article Title Preview";
        seoTitlePreview.textContent = displayTitle;

        // Update URL preview
        let slug = slugInput.value.trim() || "article-slug";
        seoUrlPreview.textContent = "http://studio925.com/articles/" + slug;

        // Update Description preview
        let desc = metaDescInput.value.trim() || "Provide a meta description in the sidebar inputs to preview how this article will appear in Google Search engine listings.";
        seoDescPreview.textContent = desc;

        // Update Character Count
        descCounter.textContent = metaDescInput.value.length + "/255 characters";
    }

    titleInput.addEventListener("input", updateSeoPreview);
    slugInput.addEventListener("input", updateSeoPreview);
    metaTitleInput.addEventListener("input", updateSeoPreview);
    metaDescInput.addEventListener("input", updateSeoPreview);

    // Run preview once on load
    updateSeoPreview();
</script>
';

require_once __DIR__ . '/partials/footer.php'; 
?>
