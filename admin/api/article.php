
<?php
/**
 * Studio925 Single Article Detail API
 * GET /api/article.php?id=1
 * GET /api/article.php?slug=your-article-slug
 *
 * Returns one article with all details:
 * id, title, slug, content, cover_image, meta_title, meta_description,
 * meta_keywords, status, author_id, created_at, updated_at, excerpt, plain_text
 *
 * Query params:
 * - id       Numeric article ID
 * - slug     Article slug
 * - status   Published | Draft | all    Default: Published
 *
 * Important:
 * By default, this API returns only Published articles.
 * Do not expose status=all publicly unless this API is protected by admin auth.
 */

require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
// Optional CORS. Remove this line if the API is only used by the same website.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Only GET method is allowed.'
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Build a safe excerpt from HTML content.
 */
function build_excerpt(string $html, int $length = 180): string
{
    $plainText = trim(preg_replace('/\s+/', ' ', strip_tags($html)));

    if (function_exists('mb_strlen') && function_exists('mb_substr')) {
        return mb_strlen($plainText) > $length
            ? mb_substr($plainText, 0, $length) . '...'
            : $plainText;
    }

    return strlen($plainText) > $length
        ? substr($plainText, 0, $length) . '...'
        : $plainText;
}

try {
    $db = Database::getInstance();

    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    $slug = trim($_GET['slug'] ?? '');
    $status = trim($_GET['status'] ?? 'Published');

    if ($id <= 0 && $slug === '') {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please provide article id or slug.',
            'examples' => [
                '/api/article.php?id=1',
                '/api/article.php?slug=your-article-slug'
            ]
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    $where = [];
    $params = [];

    // Prefer id when both id and slug are provided.
    if ($id > 0) {
        $where[] = 'id = :id';
        $params[':id'] = $id;
    } else {
        // Keep slug safe and URL-friendly.
        $slug = strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $slug));
        $slug = trim($slug, '-');

        if ($slug === '') {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid article slug.'
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            exit;
        }

        $where[] = 'slug = :slug';
        $params[':slug'] = $slug;
    }

    // Default: return only published articles for public website/frontend.
    // status=all can expose drafts, so keep it only for protected admin usage.
    if (strtolower($status) !== 'all') {
        $validStatuses = [
            'published' => 'Published',
            'draft' => 'Draft'
        ];
        $normalizedStatus = $validStatuses[strtolower($status)] ?? 'Published';
        $where[] = 'status = :status';
        $params[':status'] = $normalizedStatus;
    }

    $whereSql = 'WHERE ' . implode(' AND ', $where);

    $sql = "
        SELECT
            id,
            title,
            slug,
            content,
            cover_image,
            meta_title,
            meta_description,
            meta_keywords,
            status,
            author_id,
            created_at,
            updated_at
        FROM articles
        {$whereSql}
        LIMIT 1
    ";

    $stmt = $db->prepare($sql);
    foreach ($params as $key => $value) {
        if ($key === ':id') {
            $stmt->bindValue($key, $value, PDO::PARAM_INT);
        } else {
            $stmt->bindValue($key, $value);
        }
    }
    $stmt->execute();

    $article = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$article) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Article not found.'
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    $plainText = trim(preg_replace('/\s+/', ' ', strip_tags($article['content'] ?? '')));

    $data = [
        'id' => (int) $article['id'],
        'title' => $article['title'],
        'slug' => $article['slug'],
        'content' => $article['content'], // Full HTML content from Quill editor
        'plain_text' => $plainText,
        'excerpt' => build_excerpt($article['content'] ?? ''),
        'cover_image' => '/admin/'.$article['cover_image'],
        'seo' => [
            'meta_title' => $article['meta_title'] ?: $article['title'],
            'meta_description' => $article['meta_description'],
            'meta_keywords' => $article['meta_keywords']
        ],
        'status' => $article['status'],
        'author_id' => isset($article['author_id']) ? (int) $article['author_id'] : null,
        'created_at' => $article['created_at'],
        'updated_at' => $article['updated_at']
    ];

    echo json_encode([
        'success' => true,
        'message' => 'Article fetched successfully.',
        'data' => $data
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error while fetching article.',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
