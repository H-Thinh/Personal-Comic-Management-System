# Personal Comic Management System

Personal Comic Management System is a full-stack web application designed to help users manage, organize, read, and interact with comics in a personal online library. The system includes a user interface for browsing and reading comics, as well as an admin dashboard for managing comics, chapters, authors, categories, users, comments, and ratings.

## Project Overview

This project was built as a personal comic management platform with both frontend and backend development. It focuses on comic organization, user interaction, authentication, authorization, image management, and real-time communication.

The system allows users to browse comics, search and filter comics, read chapters, save favorite comics, track reading history, comment, and rate comics. Admin users can manage the entire comic database through a dedicated dashboard.

## Features

## User Features

- Register and log in to the system
- Browse comic list
- Search comics by title
- Filter comics by category
- View comic details
- Read comic chapters
- Save favorite comics
- Track reading history
- Comment on comics
- Rate comics
- Use real-time chat functionality

## Admin Features

- Manage comics
- Manage comic chapters
- Manage authors
- Manage categories
- Manage users
- Manage comments
- Manage ratings and reviews
- Upload and manage comic images
- Manage roles and permissions
- Control user access based on roles

## Tech Stack

## Frontend

- ReactJS
- TypeScript
- TailwindCSS
- Ant Design
- Redux Toolkit
- Axios
- Socket.IO Client

## Backend

- NodeJS
- ExpressJS
- Prisma ORM
- JWT Authentication
- Socket.IO
- Cloudinary
- VNPay
- Nodemailer

## Database

- MySQL or PostgreSQL
- Prisma Migration

## Other Tools

- RESTful API
- Authentication
- Authorization
- Role-based Access Control
- Image Upload
- Real-time Communication

## Project Structure

```bash
comic-management-system/
├── ComicHT/          # Frontend source code
├── be-comic/         # Backend source code
├── README.md
└── .git
```

## Installation

## 1. Clone the repository

```bash
git clone https://github.com/H-Thinh/Personal-Comic-Management-System.git
cd comic-management-system
```

## 2. Install frontend dependencies

```bash
cd ComicHT
npm install
```

## 3. Install backend dependencies

```bash
cd ../be-comic
npm install
```

## Environment Variables

Create a `.env` file inside the `be-comic` folder.

Example:

```env
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
```

## Database Setup

Go to the backend folder:

```bash
cd be-comic
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Running the Project

## Run Backend

```bash
cd be-comic
npm run dev
```

The backend server will run at:

```bash
http://localhost:5000
```

## Run Frontend

Open a new terminal and run:

```bash
cd ComicHT
npm run dev
```

The frontend will run at:

```bash
http://localhost:5173
```

## Main Functional Modules

## Authentication

The system uses JWT Authentication to verify user identity and protect private routes.

## Authorization

Role-based access control is used to manage permissions between normal users and admin users.

## Comic Management

Admins can create, update, delete, and manage comics, chapters, authors, and categories.

## User Interaction

Users can save favorite comics, track reading history, comment on comics, and rate comics.

## Image Upload

Cloudinary is integrated to upload and store comic images.

## Real-Time Chat

Socket.IO is used to support real-time communication inside the system.

## Payment

VNPay is integrated to support online payment functionality.

## API Overview

Main API groups include:

```bash
/auth
/users
/comics
/chapters
/categories
/authors
/comments
/ratings
/payments
```

## Future Improvements

- Improve the comic reading interface
- Add advanced comic recommendation features
- Add notification system
- Add comic ranking and trending system
- Improve mobile responsive design
- Add dark mode
- Improve admin analytics dashboard
- Optimize API performance

## What I Learned

Through this project, I practiced building a full-stack web application with ReactJS, TypeScript, NodeJS, ExpressJS, Prisma ORM, and RESTful API. I also gained experience in authentication, authorization, database design, image upload, real-time communication, and organizing source code in a maintainable structure.
