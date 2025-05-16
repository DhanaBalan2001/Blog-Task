Blog Management Application
A full-stack MERN (MongoDB, Express, React, Node.js) application for creating, managing, and sharing blog posts.

Features
User Authentication: Secure signup and login functionality
Blog Management: Create, read, update, and delete blog posts
Filtering: Filter blogs by category and author
Responsive Design: Mobile-friendly interface using React Bootstrap
Image Support: Add images to blog posts
User-specific Content: View all blogs or just your own
Technologies Used
Frontend
React.js
React Router for navigation
React Bootstrap for UI components
Axios for API requests
React Toastify for notifications
Context API for state management
Backend
Node.js
Express.js
MongoDB with Mongoose
JWT for authentication
Bcrypt for password hashing
Installation and Setup
Prerequisites
Node.js (v14 or later)
MongoDB (local or Atlas)
npm or yarn
Backend Setup
Clone the repository

git clone https://github.com/yourusername/blog-management-app.git
cd blog-management-app

Copy

Execute

Install server dependencies

cd server
npm install

Copy

Execute

Create a .env file in the server directory with the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Copy

Apply

Start the server

npm start

Copy

Execute

For development with auto-restart:

npm run dev

Copy

Execute

Frontend Setup
Open a new terminal and navigate to the client directory

cd ../client

Copy

Execute

Install client dependencies

npm install

Copy

Execute

Create a .env file in the client directory with:

REACT_APP_API_URL=http://localhost:5000/api

Copy

Apply

Start the client

npm start

Copy

Execute

API Endpoints
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user
Blogs
GET /api/blogs - Get all blogs (with optional filtering)
GET /api/blogs/:id - Get a specific blog
POST /api/blogs - Create a new blog
PUT /api/blogs/:id - Update a blog
DELETE /api/blogs/:id - Delete a blog
User
GET /api/users/me - Get current user info
GET /api/users/:id/blogs - Get blogs by a specific user
Project Structure
blog-management-app/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context API
│   │   ├── services/       # API services
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
│
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
│
└── README.md               # Project documentation

Copy

Apply

Usage
Register a new account or login with existing credentials
Browse all blogs on the home page
Use the filter options to find specific blogs
Click "Read More" to view a full blog post
Create a new blog using the "Create Blog" button
Edit or delete your own blogs
View only your blogs in the "My Blogs" section
Screenshots

Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
React Bootstrap for the UI components
MongoDB Atlas for database hosting
All contributors who have helped improve this project
