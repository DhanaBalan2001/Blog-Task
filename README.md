# Blog Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for creating, managing, and sharing blog posts.

## Features

- **User Authentication**: Secure signup and login functionality
- **Blog Management**: Create, read, update, and delete blog posts
- **Filtering**: Filter blogs by category and author
- **Responsive Design**: Mobile-friendly interface using React Bootstrap
- **Image Support**: Add images to blog posts
- **User-specific Content**: View all blogs or just your own
  
## Technologies Used

#Frontend :
- React.js
- React Router for navigation
- React Bootstrap for UI components
- Axios for API requests
- React Toastify for notifications
- Context API for state management
  
#Backend :
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing


## Installation

1. #Clone the repository
   ```bash
   git clone <repository-url>
   cd client
   ```

2. #Install dependencies
   ```bash
   npm install
   ```

3. #Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   NODE_ENV=development
   ```

4. #Start the server
   ```bash
   npm start
   ```

   #For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

#Authentication :

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

#Blogs :

- `GET /api/blogs` - Get all blogs (with optional filtering)
- `GET /api/blogs/:id` - Get a specific blog
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog

#User :

- `GET /api/users/me` - Get current user info
- `GET /api/users/:id/blogs` - Get blogs by a specific user


## Usage

-  Register a new account or login with existing credentials
-  Browse all blogs on the home page
-  Use the filter options to find specific blogs
-  Click "Read More" to view a full blog post
-  Create a new blog using the "Create Blog" button
-  Edit or delete your own blogs
-  View only your blogs in the "My Blogs" section

## License

This project is licensed under the MIT License - see the LICENSE file for details.

