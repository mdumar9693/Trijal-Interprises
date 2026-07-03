<?php
/**
 * Project Controller
 * Handles project management
 */

class ProjectController {
    private $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getPDO();
    }
    
    /**
     * Get all projects
     */
    public function getAll() {
        try {
            $query = 'SELECT * FROM projects WHERE status = "active" ORDER BY created_at DESC LIMIT 50';
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $projects,
                'count' => count($projects)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
    
    /**
     * Get project by ID
     */
    public function getById($id) {
        try {
            $id = intval($id);
            $query = 'SELECT * FROM projects WHERE id = :id';
            $stmt = $this->db->prepare($query);
            $stmt->execute([':id' => $id]);
            $project = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$project) {
                throw new Exception('Project not found', 404);
            }
            
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $project]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
    
    /**
     * Create new project
     */
    public function create() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $title = htmlspecialchars($data['title']);
            $description = htmlspecialchars($data['description']);
            $location = htmlspecialchars($data['location']);
            $service_type = htmlspecialchars($data['service_type']);
            $status = htmlspecialchars($data['status'] ?? 'active');
            
            $query = 'INSERT INTO projects (title, description, location, service_type, status, created_at) 
                     VALUES (:title, :description, :location, :service_type, :status, NOW())';
            
            $stmt = $this->db->prepare($query);
            $stmt->execute([
                ':title' => $title,
                ':description' => $description,
                ':location' => $location,
                ':service_type' => $service_type,
                ':status' => $status
            ]);
            
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Project created successfully',
                'id' => $this->db->lastInsertId()
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
    
    /**
     * Update project
     */
    public function update($id) {
        try {
            $id = intval($id);
            $data = json_decode(file_get_contents('php://input'), true);
            
            $query = 'UPDATE projects SET ';
            $updates = [];
            $params = [':id' => $id];
            
            if (isset($data['title'])) {
                $updates[] = 'title = :title';
                $params[':title'] = htmlspecialchars($data['title']);
            }
            if (isset($data['description'])) {
                $updates[] = 'description = :description';
                $params[':description'] = htmlspecialchars($data['description']);
            }
            if (isset($data['status'])) {
                $updates[] = 'status = :status';
                $params[':status'] = htmlspecialchars($data['status']);
            }
            
            if (empty($updates)) {
                throw new Exception('No fields to update');
            }
            
            $query .= implode(', ', $updates) . ', updated_at = NOW() WHERE id = :id';
            $stmt = $this->db->prepare($query);
            $stmt->execute($params);
            
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Project updated successfully']);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
    
    /**
     * Delete project
     */
    public function delete($id) {
        try {
            $id = intval($id);
            $query = 'DELETE FROM projects WHERE id = :id';
            $stmt = $this->db->prepare($query);
            $stmt->execute([':id' => $id]);
            
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Project deleted successfully']);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
?>