# TRIJAL ENTERPRISES Backend API

PHP-based REST API for TRIJAL ENTERPRISES drilling services management system.

## Setup Instructions

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache with mod_rewrite enabled
- Composer (optional, for dependencies)

### Installation

1. **Clone and Navigate**
   ```bash
   cd backend
   ```

2. **Database Setup**
   - Import the database schema:
   ```bash
   mysql -u root -p < sql/database.sql
   ```
   - Update database credentials in `config/Database.php`

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` with your configuration

4. **Set Permissions**
   ```bash
   chmod 755 uploads/
   chmod 644 config/config.php
   ```

5. **Start Local Server**
   ```bash
   php -S localhost:8000 -t public/
   ```

## API Endpoints

### Contact Management
- **POST** `/api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919801987890",
    "location": "Bokaro",
    "service_type": "borewell",
    "message": "Project details here"
  }
  ```

### Project Management
- **GET** `/api/projects` - Get all projects
- **GET** `/api/projects/{id}` - Get specific project
- **POST** `/api/projects` - Create project
- **PUT** `/api/projects/{id}` - Update project
- **DELETE** `/api/projects/{id}` - Delete project

### Quote Management
- **POST** `/api/quotes` - Create quote request
- **GET** `/api/quotes/{id}` - Get quote details

## Directory Structure

```
backend/
├── api/
│   └── index.php           # API entry point
├── config/
│   ├── config.php          # Configuration file
│   └── Database.php        # Database class
├── controllers/
│   ├── ContactController.php
│   ├── ProjectController.php
│   └── QuoteController.php
├── sql/
│   └── database.sql        # Database schema
├── uploads/                # File upload directory
├── public/
│   └── index.html         # API documentation
├── .env.example           # Environment variables template
└── README.md              # This file
```

## Security Features

- Input validation and sanitization
- SQL prepared statements
- XSS protection
- CORS headers
- Environment variables for sensitive data

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Role-based access control
- [ ] Email notifications
- [ ] File upload handling
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] Payment integration

## Support

For issues or questions, contact: trijalenterprises@gmail.com
