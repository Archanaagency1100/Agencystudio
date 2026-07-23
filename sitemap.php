<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Automatic XML Sitemap Generator
|--------------------------------------------------------------------------
| Place this file at:
| /public_html/sitemap.php
|
| Public URL:
| https://1100.in/sitemap.xml
|--------------------------------------------------------------------------
*/

header('Content-Type: application/xml; charset=UTF-8');

$websiteUrl   = 'https://1100.in';
$rootDirectory = __DIR__;

/*
|--------------------------------------------------------------------------
| Folders that must never appear in the sitemap
|--------------------------------------------------------------------------
*/

$ignoredFolders = [
    'admin',
    'api',
    'assets',
    'components',
    'css',
    'js',
    'scss',
    'images',
    'img',
    'fonts',
    'uploads',
    'vendor',
    'node_modules',
    '.git',
    '.well-known',
    'includes',
    'inc',
    'config',
    'backup',
    'backups',
    'cache',
    'temp',
    'tmp'
];

/*
|--------------------------------------------------------------------------
| Exact filenames that must never appear in the sitemap
|--------------------------------------------------------------------------
|
| articles.html is your dynamic article-detail template, so it is excluded.
| Individual published article URLs are added separately from the API.
|--------------------------------------------------------------------------
*/

$ignoredFiles = [
    'sitemap.php',
    'sitemap.xml',
    'robots.txt',

    '404.html',
    '403.html',
    '500.html',

    'login.php',
    'logout.php',
    'register.php',

    'thank-you.html',
    'thankyou.html',

    'draft.html',
    'draft.php',

    'loader.html',
    'loader.php',

    'article-detail.html',
    'article-detail.php',

    'articles.html',
    'articles.php',

    'maintainance.html',
    'maintainance.php',
    'maintenance.html',
    'maintenance.php',

    'test-contact.html',
    'test-contact.php'
];

/*
|--------------------------------------------------------------------------
| Filename prefixes that indicate private, test, draft or utility pages
|--------------------------------------------------------------------------
*/

$ignoredFilePrefixes = [
    'test-',
    'test_',
    'draft-',
    'draft_',
    'temp-',
    'temp_',
    'backup-',
    'backup_',
    'old-',
    'old_'
];

$allowedExtensions = ['html', 'htm', 'php'];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function escapeXml(string $value): string
{
    return htmlspecialchars(
        $value,
        ENT_XML1 | ENT_QUOTES,
        'UTF-8'
    );
}

function normaliseRelativePath(string $path): string
{
    return ltrim(str_replace('\\', '/', $path), '/');
}

function containsIgnoredFolder(
    string $relativePath,
    array $ignoredFolders
): bool {
    $parts = explode('/', trim($relativePath, '/'));

    foreach ($parts as $part) {
        if (in_array(strtolower($part), $ignoredFolders, true)) {
            return true;
        }
    }

    return false;
}

function startsWithIgnoredPrefix(
    string $filename,
    array $ignoredFilePrefixes
): bool {
    $filename = strtolower($filename);

    foreach ($ignoredFilePrefixes as $prefix) {
        if (str_starts_with($filename, strtolower($prefix))) {
            return true;
        }
    }

    return false;
}

function shouldIgnoreFile(
    string $relativePath,
    string $filename,
    array $ignoredFolders,
    array $ignoredFiles,
    array $ignoredFilePrefixes
): bool {
    if (containsIgnoredFolder($relativePath, $ignoredFolders)) {
        return true;
    }

    $filename = strtolower($filename);

    if (in_array($filename, $ignoredFiles, true)) {
        return true;
    }

    if (startsWithIgnoredPrefix($filename, $ignoredFilePrefixes)) {
        return true;
    }

    return false;
}

function convertFileToUrl(
    string $relativePath,
    string $websiteUrl
): string {
    $relativePath = normaliseRelativePath($relativePath);

    /*
    | index.html or index.php becomes the folder URL.
    */

    if (preg_match('#(^|/)index\.(html?|php)$#i', $relativePath)) {
        $relativePath = preg_replace(
            '#index\.(html?|php)$#i',
            '',
            $relativePath
        );

        $url = rtrim($websiteUrl, '/') . '/' . ltrim($relativePath, '/');

        return rtrim($url, '/') . '/';
    }

    /*
    | Remove .html, .htm or .php because clean URLs are enabled.
    */

    $relativePath = preg_replace(
        '/\.(html?|php)$/i',
        '',
        $relativePath
    );

    return rtrim($websiteUrl, '/') . '/' . ltrim($relativePath, '/');
}

function getPriority(string $url): string
{
    $path = parse_url($url, PHP_URL_PATH) ?: '/';

    if ($path === '/' || $path === '') {
        return '1.0';
    }

    if (
        str_contains($path, '/portfolio') ||
        str_contains($path, '/services') ||
        $path === '/studio'
    ) {
        return '0.9';
    }

    if (
        str_contains($path, '/article') ||
        str_contains($path, '/articles') ||
        str_contains($path, '/blog')
    ) {
        return '0.8';
    }

    return '0.7';
}

function getChangeFrequency(string $url): string
{
    $path = parse_url($url, PHP_URL_PATH) ?: '/';

    if (
        $path === '/' ||
        str_contains($path, '/portfolio') ||
        str_contains($path, '/gallery') ||
        str_contains($path, '/article') ||
        str_contains($path, '/articles')
    ) {
        return 'weekly';
    }

    return 'monthly';
}

function addSitemapUrl(
    array &$sitemapUrls,
    string $url,
    string $lastModified,
    string $changeFrequency,
    string $priority
): void {
    $url = trim($url);

    if ($url === '') {
        return;
    }

    /*
    | Keep the homepage with a trailing slash.
    | Remove trailing slashes from other URLs.
    */

    if (rtrim($url, '/') === 'https://1100.in') {
        $url = 'https://1100.in/';
    } else {
        $url = rtrim($url, '/');
    }

    $sitemapUrls[$url] = [
        'loc'        => $url,
        'lastmod'    => $lastModified,
        'changefreq' => $changeFrequency,
        'priority'   => $priority
    ];
}

function fetchJson(string $url): ?array
{
    if (!function_exists('curl_init')) {
        return null;
    }

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_HTTPHEADER     => [
            'Accept: application/json'
        ]
    ]);

    $response = curl_exec($curl);
    $httpCode = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);

    if (
        $response === false ||
        $httpCode < 200 ||
        $httpCode >= 300
    ) {
        return null;
    }

    $decoded = json_decode($response, true);

    return is_array($decoded) ? $decoded : null;
}

function extractArticles(array $response): array
{
    if (
        isset($response['articles']) &&
        is_array($response['articles'])
    ) {
        return $response['articles'];
    }

    if (
        isset($response['data']['articles']) &&
        is_array($response['data']['articles'])
    ) {
        return $response['data']['articles'];
    }

    if (
        isset($response['data']) &&
        is_array($response['data'])
    ) {
        return $response['data'];
    }

    /*
    | Support APIs that return a plain numeric array.
    */

    $keys = array_keys($response);

    if ($keys === range(0, count($response) - 1)) {
        return $response;
    }

    return [];
}

/*
|--------------------------------------------------------------------------
| Build sitemap
|--------------------------------------------------------------------------
*/

$sitemapUrls = [];

/*
|--------------------------------------------------------------------------
| 1. Scan public HTML and PHP pages
|--------------------------------------------------------------------------
*/

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(
        $rootDirectory,
        FilesystemIterator::SKIP_DOTS
    )
);

foreach ($iterator as $fileInfo) {
    if (!$fileInfo->isFile()) {
        continue;
    }

    $extension = strtolower($fileInfo->getExtension());

    if (!in_array($extension, $allowedExtensions, true)) {
        continue;
    }

    $absolutePath = $fileInfo->getPathname();

    $relativePath = normaliseRelativePath(
        substr($absolutePath, strlen($rootDirectory))
    );

    $filename = strtolower($fileInfo->getFilename());

    if (
        shouldIgnoreFile(
            $relativePath,
            $filename,
            $ignoredFolders,
            $ignoredFiles,
            $ignoredFilePrefixes
        )
    ) {
        continue;
    }

    $url = convertFileToUrl(
        $relativePath,
        $websiteUrl
    );

    $lastModified = date(
        'Y-m-d',
        $fileInfo->getMTime()
    );

    addSitemapUrl(
        $sitemapUrls,
        $url,
        $lastModified,
        getChangeFrequency($url),
        getPriority($url)
    );
}

/*
|--------------------------------------------------------------------------
| 2. Add all published articles from the API
|--------------------------------------------------------------------------
|
| Public article URL:
| https://1100.in/studio/articles/article-slug
|--------------------------------------------------------------------------
*/

$articlesApiBase = 'https://1100.in/admin/api/articles.php';
$articleLimit    = 50;
$maximumPages    = 100;

for ($page = 1; $page <= $maximumPages; $page++) {
    $articlesApi = $articlesApiBase
        . '?status=Published'
        . '&sort_by=updated_at'
        . '&sort_order=desc'
        . '&page=' . $page
        . '&limit=' . $articleLimit;

    $apiResponse = fetchJson($articlesApi);

    if ($apiResponse === null) {
        break;
    }

    $articles = extractArticles($apiResponse);

    if (empty($articles)) {
        break;
    }

    foreach ($articles as $article) {
        if (!is_array($article)) {
            continue;
        }

        if (
            isset($article['status']) &&
            strtolower(trim((string) $article['status'])) !== 'published'
        ) {
            continue;
        }

        /*
        | A slug is required for the clean SEO URL.
        | Articles without a slug are intentionally skipped.
        */

        $slug = trim((string) ($article['slug'] ?? ''));

        if ($slug === '') {
            continue;
        }

        $articleUrl =
            rtrim($websiteUrl, '/')
            . '/studio/articles/'
            . rawurlencode($slug);

        $articleDate =
            $article['updated_at']
            ?? $article['created_at']
            ?? date('Y-m-d');

        $timestamp = strtotime((string) $articleDate);

        $lastModified = $timestamp
            ? date('Y-m-d', $timestamp)
            : date('Y-m-d');

        addSitemapUrl(
            $sitemapUrls,
            $articleUrl,
            $lastModified,
            'monthly',
            '0.8'
        );
    }

    /*
    | If fewer than the requested limit are returned,
    | this was the final API page.
    */

    if (count($articles) < $articleLimit) {
        break;
    }
}

/*
|--------------------------------------------------------------------------
| Sort URLs
|--------------------------------------------------------------------------
*/

ksort($sitemapUrls);

/*
|--------------------------------------------------------------------------
| Output XML
|--------------------------------------------------------------------------
*/

echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;

echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    . PHP_EOL;

foreach ($sitemapUrls as $item) {
    echo '    <url>' . PHP_EOL;

    echo '        <loc>'
        . escapeXml($item['loc'])
        . '</loc>'
        . PHP_EOL;

    echo '        <lastmod>'
        . escapeXml($item['lastmod'])
        . '</lastmod>'
        . PHP_EOL;

    echo '        <changefreq>'
        . escapeXml($item['changefreq'])
        . '</changefreq>'
        . PHP_EOL;

    echo '        <priority>'
        . escapeXml($item['priority'])
        . '</priority>'
        . PHP_EOL;

    echo '    </url>' . PHP_EOL;
}

echo '</urlset>';