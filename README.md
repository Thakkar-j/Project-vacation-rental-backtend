# Vacation Rental Project

## Project Overview

A comprehensive full-stack vacation rental platform built with a robust Node.js/Express backend and a dynamic React frontend. Features include secure Google Authentication, property image management via Cloudinary, and MongoDB for database storage.

## Features

- **Vacation Rental Platform:** Browse, view, and book vacation properties. Includes "About Us" and "Blog" sections, as well as a contact form to reach the admin directly. Users with the Host role can list their properties directly from their profile.
- **Scalable Backend:** RESTful API powered by Node.js, Express, and MongoDB (via Mongoose). Features complete CRUD operations for users and properties. The codebase is modular, with dedicated files for the database connection, Cloudinary configuration, and Google Authentication logic. Models include robust schemas for both users and properties.
- **Image Management:** Integrated with Cloudinary and Multer middleware for seamless property image uploads and automatic optimization.
- **Secure Authentication:** User authentication utilizing JSON Web Tokens (JWT) and Google OAuth workflows. Google Sign-Up/Sign-In makes the onboarding process hassle-free for users; they do not need to remember a password, manually fill in their name and email, or upload a profile picture, as this data is securely fetched directly from Google.
- **Role-Based Access Control:** Dynamic frontend UI adjusting to user states (logged in/out) and roles (User, Host, Admin).
- **Dynamic Frontend:** Fast, responsive, and interactive user interface built with React (Vite), Bootstrap, and React Hook Form.

## Tech Stack

- **Frontend:** React 19 (Vite), Bootstrap, React Router DOM, React Hook Form, `@react-oauth/google`, Axios
- **Backend:** Node.js, Express 5, Mongoose (MongoDB), Cloudinary, Multer, JSONWebToken, Google APIs, CORS, Dotenv

## Prerequisites

- Node.js (v16.x or higher recommended)
- `npm` or `yarn`
- MongoDB Cluster (e.g., MongoDB Atlas) or local instance
- Cloudinary Account
- Google Cloud Console project for OAuth credentials

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Draft-project
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd Backend
npm install
```

**Configure environment variables:**
Create a `.env` file in the `Backend` directory and add your necessary configuration (e.g., Google credentials, ports, cloudinary):

```
PORT=

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

MONGODB_URI=""

JWT_SECRET=""
JWT_TIMEOUT=""
```

**Start the backend server:**

```bash
npm start
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd Frontend
npm install
npm run dev
```

**Configure environment variables:**
Create a `.env` file in the `frontend` directory and add your necessary configuration (Google client, backend url)

```
VITE_GOOGLE_CLIENT_ID=
VITE_BACKEND_URL=
```

## Project Structure

```text
vacation-rental-project/
├── Backend/              # Node.js backend application
-│   ├── src/              # Backend API routes, controllers, and services
+│   ├── controllers/      # Route handlers and business logic
+│   ├── models/           # Mongoose schemas (e.g., User, Property, Booking)
+│   ├── routes/           # Express API routes
+│   ├── middlewares/      # Custom Express middlewares (Auth, Multer)
+│   ├── utils/            # Helper functions (Cloudinary upload config, DB connection and googlecloud config function)
│   ├── package.json      # Backend dependencies
│   └── ...
├── Frontend/             # Frontend client application
-│   ├── src/              # UI components, pages, and assets
+│   ├── src/
+│   │   ├── assets/       # Static assets like images or icons
+│   │   ├── components/   # Reusable UI components
+│   │   ├── pages/        # React Router view components (Home, Listing, Login)
+│   │   ├── context/      # used for check user login or logout here
+│   │   ├── routing/      # React router for every page
+│   │   ├── App.jsx       # Main application routing and wrapper
+│   │   └── main.jsx      # React entry point
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
│   └── ...
└── README.md             # Project documentation

```
