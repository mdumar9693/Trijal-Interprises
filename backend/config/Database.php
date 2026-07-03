<?php
/**
 * Database Configuration
 * Handles database connection and basic operations
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'trijal_enterprises';
    private $user = 'root';
    private $pass = '';
    private $charset = 'utf8mb4';
    
    private $pdo;
    
    /**
     * Connect to database
     */
    public function connect() {
        try {
            $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->db_name . ';charset=' . $this->charset;
            $this->pdo = new PDO($dsn, $this->user, $this->pass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->pdo;
        } catch (PDOException $e) {
            die('Database Connection Error: ' . $e->getMessage());
        }
    }
    
    /**
     * Get PDO instance
     */
    public function getPDO() {
        if ($this->pdo === null) {
            $this->connect();
        }
        return $this->pdo;
    }
}
?>