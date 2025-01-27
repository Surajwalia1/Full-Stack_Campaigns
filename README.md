# Role-Based Marketing Campaign Scheduler Backend

# Backend!

### Key Features:
- Admin registration and login using JWT.
- Admin authentication and authorization middleware.
- Campaign creation with targeting based on user category.
- Email notification to users matching campaign category using NodeMailer.
- Campaign scheduling using `node-schedule` to automate email sending.
- Rate limiting for API endpoints.
- Middleware for input validation.
- JsDocs for code commenting explation

## Tech Stack

- **Node.js**: JavaScript runtime for backend logic.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and campaign data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **NodeMailer**: For sending emails.
- **Node-schedule**: For scheduling campaign emails.
- **Bcrypt**: For hashing passwords.

## Installation

Follow the steps below to set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd <repo_name>


## API Endpoints
Auth Routes
POST /api/auth/register: Register a new admin.
Body: { "email": "admin@example.com", "password": "password" }
Response: { "message": "Admin registered successfully." }
POST /api/auth/login: Admin login.
Body: { "email": "admin@example.com", "password": "password" }
Response: { "message": "Login successful.", "token": "JWT_TOKEN" }
Campaign Routes
POST /api/campaigns/create: Create and schedule a campaign.
Headers: Authorization: Bearer JWT_TOKEN
Body: { "message": "Campaign Message", "category": "Category", "scheduledTime": "2025-01-27T12:00:00Z", "repeatPattern": "daily" }
Response: { "message": "Campaign created and scheduled successfully.", "campaign": { ...campaign_details } }
User Routes
POST /api/users/create: Create a new user (only admin).
Headers: Authorization: Bearer JWT_TOKEN
Body: { "email": "user@example.com", "password": "password", "role": "user", "category": "Category" }
Response: { "message": "User created successfully.", "user": { ...user_details } }



# Marketing Campaign Frontend

## Overview
This project is the frontend for the Marketing Campaign Backend System, which allows Admin users to manage marketing campaigns, schedule tasks, and handle user management. Built with React, TypeScript, and Material UI, this frontend provides a user-friendly interface with various features such as campaign creation, user management, and campaign tracking.

## Features
- Admin Dashboard for campaign and user management
- Campaign creation and scheduling
- Real-time updates and notifications
- User management
- Responsive design with Material UI
- Animations with Framer Motion
- Form handling with React Hook Form
- JsDocs
- Lazy loading(Suspense)

## Tech Stack
- **Frontend**: React (v18.3.1), Vite (v6.0.5), TypeScript (v5.6.2)
- **UI Components**: Material UI (v6.4.1)
- **State Management**: Redux Toolkit (v2.5.1), React Redux (v9.2.0)
- **Form Handling**: React Hook Form (v7.54.2)
- **Routing**: React Router DOM (v7.1.3)
- **Animations**: Framer Motion (v12.0.5)
- **Notifications**: React Toastify (v11.0.3)
- **Skeleton Loader**: React Loading Skeleton (v3.5.0)

## Setup

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Surajwalia1/marketing-campaign-frontend.git
    cd marketing-campaign-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Development
To run the application in development mode, use the following command:
```bash
npm run dev

