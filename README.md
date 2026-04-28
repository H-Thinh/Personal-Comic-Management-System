# Personal Comic Management System

A full-stack personal comic management system that allows users to browse, manage, read, and interact with comics online. The system includes a user-facing comic reading interface and an admin dashboard for managing comics, chapters, authors, categories, users, comments, and ratings.

## Features

### User Features

- User registration and login
- Browse comic list
- Search comics by title
- Filter comics by category
- View comic details
- Read comic chapters
- Add comics to favorites
- View reading history
- Comment on comics
- Rate comics
- Real-time chat support

### Admin Features

- Admin dashboard
- Manage comics
- Manage comic chapters
- Manage authors
- Manage categories
- Manage users
- Manage comments
- Manage ratings/reviews
- Role-based access control
- Upload and manage comic images

## Tech Stack

### Frontend

- ReactJS
- TypeScript
- TailwindCSS
- Ant Design
- Redux Toolkit
- Axios
- Socket.IO Client

### Backend

- NodeJS
- ExpressJS
- Prisma ORM
- JWT Authentication
- Socket.IO
- Cloudinary
- VNPay
- Nodemailer

### Database

- MySQL or PostgreSQL
- Prisma Migration

## Project Structure


comic-management-system/
├── ComicHT/          # Frontend source code
├── be-comic/         # Backend source code
├── README.md
└── .git
Installation
1. Clone the repository
git clone <your-repository-url>
cd comic-management-system
2. Install frontend dependencies
cd ComicHT
npm install
3. Install backend dependencies
cd ../be-comic
npm install
Environment Variables

Create a .env file inside the backend folder be-comic.

Example:

DATABASE_URL="your_database_url"

JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

VNPAY_TMN_CODE="your_vnpay_tmn_code"
VNPAY_HASH_SECRET="your_vnpay_hash_secret"
VNPAY_URL="your_vnpay_url"
VNPAY_RETURN_URL="your_vnpay_return_url"

EMAIL_USER="your_email"
EMAIL_PASS="your_email_password"

PORT=5000
Database Setup

Run Prisma migration in the backend folder:

cd be-comic
npx prisma migrate dev

Generate Prisma Client:

npx prisma generate
Running the Project
Run Backend
cd be-comic
npm run dev

The backend server will run on:

http://localhost:5000
Run Frontend

Open a new terminal:

cd ComicHT
npm run dev

The frontend will run on:

http://localhost:5173
Main Functional Modules
Authentication

The system uses JWT Authentication to protect private routes and verify user identity.

Authorization

Role-based access control is used to manage permissions between normal users and admin users.

Comic Management

Admins can create, update, delete, and manage comics, chapters, authors, and categories.

Image Upload

Cloudinary is integrated for uploading and storing comic images.

Real-Time Chat

Socket.IO is used to support real-time communication inside the system.

Payment

VNPay is integrated to support online payment functionality.

API Overview

Main API groups include:

/auth
/users
/comics
/chapters
/categories
/authors
/comments
/ratings
/payments
Future Improvements
Improve UI/UX for the reading page
Add advanced comic recommendation features
Add notification system
Add comic ranking and trending system
Add mobile responsive optimization
Add dark mode
Improve admin analytics dashboard
