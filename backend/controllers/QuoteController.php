<?php
/**
 * Quote Controller
 * Handles quote generation and management
 */

class QuoteController {
    private $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getPDO();
    }
    
    /**
     * Create quote request
     */
    public function create() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validation
            $this->validate($data);
            
            // Sanitize input
            $client_name = htmlspecialchars($data['client_name']);
            $client_email = filter_var($data['client_email'], FILTER_SANITIZE_EMAIL);
            $client_phone = htmlspecialchars($data['client_phone']);
            $project_description = htmlspecialchars($data['project_description']);
            $service_type = htmlspecialchars($data['service_type']);
            $budget = floatval($data['budget'] ?? 0);
            
            // Generate quote number
            $quote_number = 'QUOTE-' . date('Ymd') . '-' . rand(1000, 9999);
            
            $query = 'INSERT INTO quotes (quote_number, client_name, client_email, client_phone, project_description, service_type, budget, status, created_at) 
                     VALUES (:quote_number, :client_name, :client_email, :client_phone, :project_description, :service_type, :budget, :status, NOW())';
            
            $stmt = $this->db->prepare($query);
            $stmt->execute([
                ':quote_number' => $quote_number,
                ':client_name' => $client_name,
                ':client_email' => $client_email,
                ':client_phone' => $client_phone,
                ':project_description' => $project_description,
                ':service_type' => $service_type,
                ':budget' => $budget,
                ':status' => 'pending'
            ]);
            
            $quote_id = $this->db->lastInsertId();
            
            // Send confirmation email
            $this->sendQuoteConfirmationEmail($client_name, $client_email, $quote_number);
            
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Quote request created successfully',
                'quote_number' => $quote_number,
                'id' => $quote_id
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
    
    /**
     * Get quote by ID
     */
    public function getById($id) {
        try {
            $id = intval($id);
            $query = 'SELECT * FROM quotes WHERE id = :id OR quote_number = :quote_number';
            $stmt = $this->db->prepare($query);
            $stmt->execute([':id' => $id, ':quote_number' => $id]);
            $quote = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$quote) {
                throw new Exception('Quote not found', 404);
            }
            
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $quote]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
    
    /**
     * Validate quote data
     */
    private function validate($data) {
        if (!isset($data['client_name']) || empty(trim($data['client_name']))) {
            throw new Exception('Client name is required');
        }
        if (!isset($data['client_email']) || !filter_var($data['client_email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Valid email is required');
        }
        if (!isset($data['client_phone']) || empty(trim($data['client_phone']))) {
            throw new Exception('Phone number is required');
        }
        if (!isset($data['project_description']) || empty(trim($data['project_description']))) {
            throw new Exception('Project description is required');
        }
        if (!isset($data['service_type']) || empty(trim($data['service_type']))) {
            throw new Exception('Service type is required');
        }
    }
    
    /**
     * Send quote confirmation email
     */
    private function sendQuoteConfirmationEmail($name, $email, $quote_number) {
        $subject = 'Quote Request Confirmation - ' . $quote_number;
        $message = "Thank you for requesting a quote!\n\nYour quote number: $quote_number\n\nWe will review your request and get back to you soon.";
        $headers = "From: " . ADMIN_EMAIL;
        
        // In production, use proper email service like PHPMailer
        // mail($email, $subject, $message, $headers);
    }
}
?>