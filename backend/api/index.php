<?php
/**
 * API Entry Point
 * Routes all API requests
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/config.php';
require_once '../config/Database.php';
require_once '../controllers/ContactController.php';
require_once '../controllers/ProjectController.php';
require_once '../controllers/QuoteController.php';

$request = $_GET['request'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];
$parts = explode('/', trim($request, '/'));
$endpoint = $parts[0] ?? '';
$action = $parts[1] ?? '';

try {
    switch ($endpoint) {
        case 'contact':
            $controller = new ContactController();
            if ($method === 'POST') {
                $controller->submit();
            } else {
                throw new Exception('Method not allowed', 405);
            }
            break;
            
        case 'projects':
            $controller = new ProjectController();
            if ($method === 'GET') {
                if ($action) {
                    $controller->getById($action);
                } else {
                    $controller->getAll();
                }
            } elseif ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'PUT' && $action) {
                $controller->update($action);
            } elseif ($method === 'DELETE' && $action) {
                $controller->delete($action);
            } else {
                throw new Exception('Method not allowed', 405);
            }
            break;
            
        case 'quotes':
            $controller = new QuoteController();
            if ($method === 'POST') {
                $controller->create();
            } elseif ($method === 'GET' && $action) {
                $controller->getById($action);
            } else {
                throw new Exception('Endpoint not found', 404);
            }
            break;
            
        default:
            throw new Exception('Endpoint not found', 404);
    }
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>