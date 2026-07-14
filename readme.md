```markdown
# BookNest - MERN Book Store Application

## Project Description

BookNest is a full-stack online bookstore application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

The application allows users to browse books, search books, manage their cart, place orders, and provides admin features for managing books and users.

---

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools
- Visual Studio Code
- Postman
- Git & GitHub

---

## Prerequisites

Before running the project, make sure the following are installed:

- Node.js (v16 or above)
- npm
- MongoDB
- Git
- Postman (optional)

---

## Project Structure

```

BookNest
│
├── client        # React frontend
│
├── server        # Express backend
│
└── docs          # Project documentation

```

---

# How to Run the Project

## 1. Clone the Repository

```

git clone https://github.com/DivyaJyothiYakkala/BookStore

```

Move into the project folder:

```

cd BookNest

```

---

# Backend Setup

## 2. Navigate to Server Folder

```

cd server

```

Install dependencies:

```

npm install

```

---

## 3. Environment Configuration

Create a `.env` file inside the server folder.

Add:

```

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

```

---

## 4. Start Backend Server

Run:

```

npm start

```

Backend will run at:

```

http://localhost:5000

```

---

# Frontend Setup

## 5. Navigate to Client Folder

Open a new terminal:

```

cd client

```

Install dependencies:

```

npm install

```

---

## 6. Start Frontend Application

Run:

```

npm run dev

```

Frontend will run at:

```

http://localhost:5173

```

Open this URL in your browser.

---

# Database Setup

- Start MongoDB service.
- Configure MongoDB connection in the `.env` file.
- Database collections will be created automatically.

Collections:

- Users
- Books
- Orders
- Reviews
- Cart

---

# Features

## User Features

- User Registration
- User Login
- Browse Books
- Search Books
- Add Books to Cart
- Update Cart Quantity
- Place Orders

## Admin Features

- Add Books
- Update Books
- Manage Users
- Manage Orders

---

# API Testing

APIs can be tested using Postman.

Backend URL:

```

http://localhost:5000

```

---

# Contributors

Add your team member names here.

---

# License

This project is created for educational purposes.
```
