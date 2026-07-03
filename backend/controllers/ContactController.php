<?php
/**
 * Contact Controller
 * Handles contact form submissions
 */

class ContactController {
    private $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getPDO();
    }
    
    /**
     * Submit contact form
     */
    public function submit() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validation
            $this->validate($data);
            
            // Sanitize input
            $name = htmlspecialchars(trim($data['name']));
            $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            $phone = htmlspecialchars(trim($data['phone']));
            $location = htmlspecialchars(trim($data['location'] ?? ''));
            $service_type = htmlspecialchars(trim($data['service_type']));
            $message = htmlspecialchars(trim($data['message']));
            
            // Insert into database
            $query = 'INSERT INTO contacts (name, email, phone, location, service_type, message, created_at) 
                     VALUES (:name, :email, :phone, :location, :service_type, :message, NOW())';
            
            $stmt = $this->db->prepare($query);
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':phone' => $phone,
                ':location' => $location,
                ':service_type' => $service_type,
                ':message' => $message
            ]);
            
            // Send email notification
            $this->sendNotificationEmail($name, $email, $phone, $service_type);
            
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Contact form submitted successfully. We will get back to you soon!',
                'id' => $this->db->lastInsertId()
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
    
    /**
     * Validate form data
     */
    private function validate($data) {
        if (!isset($data['name']) || empty(trim($data['name']))) {
            throw new Exception('Name is required');
        }
        if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Valid email is required');
        }
        if (!isset($data['phone']) || empty(trim($data['phone']))) {
            throw new Exception('Phone number is required');
        }
        if (!isset($data['service_type']) || empty(trim($data['service_type']))) {
            throw new Exception('Service type is required');
        }
        if (!isset($data['message']) || empty(trim($data['message']))) {
            throw new Exception('Message is required');
        }
    }
    
    /**
     * Send email notification
     */
    private function sendNotificationEmail($name, $email, $phone, $service_type) {
        $subject = 'New Contact Form Submission - ' . $name;
        $message = "New inquiry received:\n\nName: $name\nEmail: $email\nPhone: $phone\nService Type: $service_type";
        $headers = "From: " . ADMIN_EMAIL;
        
        // In production, use proper email service like PHPMailer
        // mail(ADMIN_EMAIL, $subject, $message, $headers);
    }
}
?>