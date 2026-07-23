<?php
/**
 * Studio925 Database connection and automatic initialization
 */
require_once __DIR__ . '/config.php';

class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        try {
            if (DB_DRIVER === 'sqlite') {
                $dsn = "sqlite:" . SQLITE_FILE;
                $this->pdo = new PDO($dsn);
                // Enable foreign keys in SQLite
                $this->pdo->exec("PRAGMA foreign_keys = ON;");
            } else {
                $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                $this->pdo = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]);
            }
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Auto initialize database tables
            $this->initializeDatabase();
        } catch (PDOException $e) {
            die("Database Connection Error: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance->pdo;
    }

    private function initializeDatabase() {
        $isSqlite = (DB_DRIVER === 'sqlite');
        
        $pkType = $isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY";
        $textType = $isSqlite ? "TEXT" : "LONGTEXT";
        $defaultTimestamp = $isSqlite ? "CURRENT_TIMESTAMP" : "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP";

        // 1. Create Users Table
        $createUsersQuery = "
            CREATE TABLE IF NOT EXISTS users (
                id $pkType,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                phone VARCHAR(20) DEFAULT '',
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) NOT NULL DEFAULT 'Editor',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ";
        $this->pdo->exec($createUsersQuery);

        // 2. Create Articles Table
        $createArticlesQuery = "
            CREATE TABLE IF NOT EXISTS articles (
                id $pkType,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                content $textType NOT NULL,
                cover_image VARCHAR(255) DEFAULT NULL,
                meta_title VARCHAR(255) DEFAULT NULL,
                meta_description TEXT DEFAULT NULL,
                meta_keywords VARCHAR(255) DEFAULT NULL,
                status VARCHAR(20) NOT NULL DEFAULT 'Draft',
                author_id INT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
            );
        ";
        $this->pdo->exec($createArticlesQuery);

        // 3. Create Contacts Table
        $createContactsQuery = "
            CREATE TABLE IF NOT EXISTS contacts (
                id $pkType,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                contact VARCHAR(20) NOT NULL,
                message TEXT,
                ip_address VARCHAR(45) NOT NULL,
                status VARCHAR(20) DEFAULT 'Pending',
                admin_note TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ";
        $this->pdo->exec($createContactsQuery);

        // Seed default administrator if users table is empty
        $checkUsers = $this->pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
        if ($checkUsers == 0) {
            $defaultUsername = 'admin';
            $defaultEmail = 'admin@studio925.com';
            $defaultPhone = '+919999999999';
            $defaultPassword = password_hash('admin123', PASSWORD_DEFAULT);
            $defaultRole = 'Admin';

            $stmt = $this->pdo->prepare("
                INSERT INTO users (username, email, phone, password, role)
                VALUES (:username, :email, :phone, :password, :role)
            ");
            $stmt->execute([
                ':username' => $defaultUsername,
                ':email' => $defaultEmail,
                ':phone' => $defaultPhone,
                ':password' => $defaultPassword,
                ':role' => $defaultRole
            ]);
        }
    }
}
