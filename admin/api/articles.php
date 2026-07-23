<?php
/**
 * Studio925 Articles API
 * GET /api/articles.php
 *
 * Supported query params:
 * - q              Search keyword in title/content/meta fields
 * - status         Published | Draft | all    Default: Published
 * - author_id      Numeric author ID
 * - date_from      YYYY-MM-DD, filters created_at >= date_from
 * - date_to        YYYY-MM-DD, filters created_at <= date_to
 * - sort_by        created_at | updated_at | title | id | status    Default: created_at
 * - sort_order     asc | desc    Default: desc
 * - page           Page number, starts from 1    Default: 1
 * - limit          Results per page, max 50       Default: 10
 * - include_content 1 to include full HTML content; default returns excerpt only
 */

require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
// Optional CORS. Remove if not needed.
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
    ]);
    exit;
}

try {
    $db = Database::getInstance();

    // -------------------------
    // Read and sanitize inputs
    // -------------------------
    $q = trim($_GET['q'] ?? '');
    $status = trim($_GET['status'] ?? 'Published');
    $author_id = isset($_GET['author_id']) ? (int) $_GET['author_id'] : 0;
    $date_from = trim($_GET['date_from'] ?? '');
    $date_to = trim($_GET['date_to'] ?? '');

    $page = max(1, (int) ($_GET['page'] ?? 1));
    $limit = (int) ($_GET['limit'] ?? 10);
    $limit = max(1, min($limit, 50)); // keep API safe from heavy requests
    $offset = ($page - 1) * $limit;

    $include_content = isset($_GET['include_content']) && $_GET['include_content'] === '1';

    // Whitelist sorting to prevent SQL injection
    $allowed_sort_columns = [
        'id' => 'id',
        'title' => 'title',
        'status' => 'status',
        'created_at' => 'created_at',
        'updated_at' => 'updated_at'
    ];

    $sort_by_input = strtolower(trim($_GET['sort_by'] ?? 'created_at'));
    $sort_by = $allowed_sort_columns[$sort_by_input] ?? 'created_at';

    $sort_order_input = strtolower(trim($_GET['sort_order'] ?? 'desc'));
    $sort_order = $sort_order_input === 'asc' ? 'ASC' : 'DESC';

    // -------------------------
    // Build WHERE conditions
    // -------------------------
    $where = [];
    $params = [];

    // Default returns only Published articles.
    // Use status=all only for admin/internal API, otherwise remove this option.
    if (strtolower($status) !== 'all') {
        $valid_statuses = ['published' => 'Published', 'draft' => 'Draft'];
        $normalized_status = $valid_statuses[strtolower($status)] ?? 'Published';
        $where[] = 'status = :status';
        $params[':status'] = $normalized_status;
    }

    if ($author_id > 0) {
        $where[] = 'author_id = :author_id';
        $params[':author_id'] = $author_id;
    }

    if ($q !== '') {
        $where[] = '(
            title LIKE :search OR
            content LIKE :search OR
            meta_title LIKE :search OR
            meta_description LIKE :search OR
            meta_keywords LIKE :search
        )';
        $params[':search'] = '%' . $q . '%';
    }

    if ($date_from !== '' && preg_match('/^\d{4}-\d{2}-\d{2}$/', $date_from)) {
        $where[] = 'created_at >= :date_from';
        $params[':date_from'] = $date_from . ' 00:00:00';
    }

    if ($date_to !== '' && preg_match('/^\d{4}-\d{2}-\d{2}$/', $date_to)) {
        $where[] = 'created_at <= :date_to';
        $params[':date_to'] = $date_to . ' 23:59:59';
    }

    $where_sql = count($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // -------------------------
    // Count total records
    // -------------------------
    $count_sql = "SELECT COUNT(*) FROM articles {$where_sql}";
    $count_stmt = $db->prepare($count_sql);
    foreach ($params as $key => $value) {
        $count_stmt->bindValue($key, $value);
    }
    $count_stmt->execute();
    $total = (int) $count_stmt->fetchColumn();
    $total_pages = (int) ceil($total / $limit);

    // -------------------------
    // Fetch articles
    // -------------------------
    $fields = $include_content
        ? 'id, title, slug, content, cover_image, meta_title, meta_description, meta_keywords, status, author_id, created_at, updated_at'
        : 'id, title, slug, cover_image, meta_title, meta_description, meta_keywords, status, author_id, created_at, updated_at, content';

    $sql = "
        SELECT {$fields}
        FROM articles
        {$where_sql}
        ORDER BY {$sort_by} {$sort_order}
        LIMIT :limit OFFSET :offset
    ";

    $stmt = $db->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Add excerpt and optionally remove full content from public response
    foreach ($articles as &$article) {
        $plain_text = trim(strip_tags($article['content'] ?? ''));
        $article['excerpt'] = mb_strlen($plain_text) > 160
            ? mb_substr($plain_text, 0, 160) . '...'
            : $plain_text;
        $article['cover_image'] = '/admin/'.$article['cover_image'];
        if (!$include_content) {
            unset($article['content']);
        }
    }
    unset($article);

    echo json_encode([
        'success' => true,
        'message' => 'Articles fetched successfully.',
        'filters' => [
            'q' => $q,
            'status' => $status,
            'author_id' => $author_id ?: null,
            'date_from' => $date_from ?: null,
            'date_to' => $date_to ?: null,
            'include_content' => $include_content
        ],
        'sorting' => [
            'sort_by' => $sort_by,
            'sort_order' => strtolower($sort_order)
        ],
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'total_pages' => $total_pages,
            'has_next' => $page < $total_pages,
            'has_prev' => $page > 1
        ],
        'data' => $articles
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error while fetching articles.',
        'error' => $e->getMessage()
    ]);
}
