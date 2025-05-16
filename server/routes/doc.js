import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog API Documentation</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        color: #2c3e50;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
      }
      h2 {
        color: #2980b9;
        margin-top: 30px;
      }
      .endpoint {
        background-color: #f8f9fa;
        border-left: 4px solid #3498db;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 0 4px 4px 0;
      }
      .method {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        margin-right: 10px;
      }
      .get {
        background-color: #2ecc71;
      }
      .post {
        background-color: #3498db;
      }
      .put {
        background-color: #f39c12;
      }
      .delete {
        background-color: #e74c3c;
      }
      pre {
        background-color: #f1f1f1;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
      }
      code {
        font-family: Consolas, Monaco, 'Andale Mono', monospace;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #f2f2f2;
      }
      .response-container {
        margin-top: 15px;
      }
      .url {
        font-family: Consolas, Monaco, 'Andale Mono', monospace;
        background-color: #f1f1f1;
        padding: 5px;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <h1>Blog API Documentation</h1>
    <p>Welcome to the Blog API documentation. This API allows users to create, read, update, and delete blog posts with authentication.</p>
    
    <h2>Base URL</h2>
    <p>All endpoints are relative to: <span class="url">${req.protocol}://${req.get('host')}</span></p>
    
    <h2>Authentication Endpoints</h2>
    
    <div class="endpoint">
      <h3><span class="method post">POST</span> /api/auth/signup</h3>
      <p>Register a new user</p>
      
      <h4>Request Body:</h4>
      <pre><code>{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}</code></pre>
      
      <h4>Response:</h4>
      <div class="response-container">
        <p>Status: 201 Created</p>
        <pre><code>{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}</code></pre>
      </div>
    </div>
    
    <div class="endpoint">
      <h3><span class="method post">POST</span> /api/auth/login</h3>
      <p>Authenticate a user and get a JWT token</p>
      
      <h4>Request Body:</h4>
      <pre><code>{
  "email": "john@example.com",
  "password": "password123"
}</code></pre>
      
      <h4>Response:</h4>
      <div class="response-container">
        <p>Status: 200 OK</p>
        <pre><code>{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}</code></pre>
      </div>
      
      <h4>Error Response:</h4>
      <div class="response-container">
        <p>Status: 401 Unauthorized</p>
        <pre><code>{
  "message": "Invalid email or password"
}</code></pre>
      </div>
    </div>
    
    <h2>Blog Endpoints</h2>
    <p>All blog endpoints require authentication. Include the JWT token in the Authorization header:</p>
    <pre><code>Authorization: Bearer YOUR_JWT_TOKEN</code></pre>
    
    <div class="endpoint">
      <h3><span class="method get">GET</span> /api/blogs</h3>
      <p>Retrieve all blogs (sorted by creation date, newest first)</p>
      
      <h4>Query Parameters:</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>category</td>
            <td>String</td>
            <td>Filter blogs by category (e.g., "Travel", "Technology")</td>
            <td>No</td>
          </tr>
          <tr>
            <td>author</td>
            <td>String</td>
            <td>Filter blogs by author name</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Response:</h4>
      <div class="response-container">
        <p>Status: 200 OK</p>
        <pre><code>[
  {
    "_id": "61a1b2c3d4e5f6a7b8c9d0e1",
    "title": "Getting Started with MERN Stack",
    "category": "Technology",
    "content": "The MERN stack consists of MongoDB, Express.js, React, and Node.js...",
    "image": "https://example.com/images/mern-stack.jpg",
    "author": "John Doe",
    "userId": "60f7a9b8c1d2e3f4a5b6c7d8",
    "createdAt": "2023-07-15T12:00:00.000Z",
    "updatedAt": "2023-07-15T12:00:00.000Z"
  },
  {
    "_id": "61a1b2c3d4e5f6a7b8c9d0e2",
    "title": "10 Must-Visit Destinations in Europe",
    "category": "Travel",
    "content": "Europe offers a rich tapestry of cultures...",
    "image": "https://example.com/images/europe-travel.jpg",
    "author": "Jane Smith",
    "userId": "60f7a9b8c1d2e3f4a5b6c7d9",
    "createdAt": "2023-07-14T10:30:00.000Z",
    "updatedAt": "2023-07-14T10:30:00.000Z"
  }
]</code></pre>
      </div>
    </div>
    
    <div class="endpoint">
      <h3><span class="method post">POST</span> /api/blogs</h3>
      <p>Create a new blog</p>
      
      <h4>Request Body:</h4>
      <pre><code>{
  "title": "Getting Started with MERN Stack",
  "category": "Technology",
  "content": "The MERN stack consists of MongoDB, Express.js, React, and Node.js...",
  "image": "https://example.com/images/mern-stack.jpg"
}</code></pre>
      
      <h4>Response:</h4>
      <div class="response-container">
        <p>Status: 201 Created</p>
        <pre><code>{
  "_id": "61a1b2c3d4e5f6a7b8c9d0e1",
  "title": "Getting Started with MERN Stack",
  "category": "Technology",
  "content": "The MERN stack consists of MongoDB, Express.js, React, and Node.js...",
  "image": "https://example.com/images/mern-stack.jpg",
  "author": "John Doe",
  "userId": "60f7a9b8c1d2e3f4a5b6c7d8",
  "createdAt": "2023-07-15T12:00:00.000Z",
  "updatedAt": "2023-07-15T12:00:00.000Z"
}</code></pre>
      </div>
    </div>
    
    <div class="endpoint">
      <h3><span class="method put">PUT</span> /api/blogs/:id</h3>
      <p>Update a specific blog by ID (only if created by the authenticated user)</p>
      
      <h4>Parameters:</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>String</td>
            <td>The MongoDB ID of the blog to update</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Request Body:</h4>
      <pre><code>{
  "title": "Updated: Getting Started with MERN Stack",
  "category": "Technology",
  "content": "Updated content about MERN stack development...",
  "image": "https://example.com/images/updated-mern.jpg"
}</code></pre>
      
      <h4>Response:</h4>
      <div class="response-container">
        <p>Status: 200 OK</p>
        <pre><code>{
  "_id": "61a1b2c3d4e5f6a7b8c9d0e1",
  "title": "Updated: Getting Started with MERN Stack",
  "category": "Technology",
  "content": "Updated content about MERN stack development...",
  "image": "https://example.com/images/updated-mern.jpg",
  "author": "John Doe",
  "userId": "60f7a9b8c1d2e3f4a5b6c7d8",
  "createdAt": "2023-07-15T12:00:00.000Z",
  "updatedAt": "2023-07-15T13:30:00.000Z"
}</code></pre>
      </div>
      
      <h4>Error Responses:</h4>
      <div class="response-container">
        <p>Status: 404 Not Found</p>
        <pre><code>{
  "message": "Blog not found"
}</code></pre>
      </div>
      <div class="response-container">
        <p>Status: 403 Forbidden</p>
        <pre><code>{
  "message": "Not authorized to update this blog"
}</code></pre>
      </div>
    </div>
    
    <div class="endpoint">
      <h3><span class="method delete">DELETE</span> /api/blogs/:id</h3>
      <p>Delete a specific blog by ID (only if created by the authenticated user)</p>
      
      <h4>Parameters:</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>String</td>
            <td>The MongoDB ID of the blog to delete</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Response:</h4>
      <div class="response-container">
        <p>Status: 200 OK</p>
        <pre><code>{
  "message": "Blog removed"
}</code></pre>
      </div>
      
      <h4>Error Responses:</h4>
      <div class="response-container">
        <p>Status: 404 Not Found</p>
        <pre><code>{
  "message": "Blog not found"
}</code></pre>
      </div>
      <div class="response-container">
        <p>Status: 403 Forbidden</p>
        <pre><code>{
  "message": "Not authorized to delete this blog"
}</code></pre>
      </div>
    </div>
    
    <h2>Error Handling</h2>
    <p>The API returns appropriate HTTP status codes:</p>
    <ul>
      <li><strong>200</strong> - Success</li>
      <li><strong>201</strong> - Created</li>
      <li><strong>400</strong> - Bad Request (e.g., missing required fields)</li>
      <li><strong>401</strong> - Unauthorized (invalid or missing token)</li>
      <li><strong>403</strong> - Forbidden (not authorized to perform the action)</li>
      <li><strong>404</strong> - Not Found</li>
      <li><strong>500</strong> - Server Error</li>
    </ul>
    
    <h2>Example Usage</h2>
    <h3>Authentication</h3>
    <pre><code>// Register a new user
fetch('${req.protocol}://${req.get('host')}/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => {
  // Save the token
  localStorage.setItem('token', data.token);
});</code></pre>
    <h3>Creating a Blog</h3>
    <pre><code>// Create a new blog
fetch('${req.protocol}://${req.get('host')}/api/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  body: JSON.stringify({
    title: 'Getting Started with MERN Stack',
    category: 'Technology',
    content: 'The MERN stack consists of MongoDB, Express.js, React, and Node.js...',
    image: 'https://example.com/images/mern-stack.jpg'
  })
})
.then(response => response.json())
.then(data => console.log(data));</code></pre>

    <h3>Getting All Blogs</h3>
    <pre><code>// Get all blogs
fetch('${req.protocol}://${req.get('host')}/api/blogs', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(response => response.json())
.then(data => console.log(data));</code></pre>

    <h3>Filtering Blogs</h3>
    <pre><code>// Filter blogs by category and author
fetch('${req.protocol}://${req.get('host')}/api/blogs?category=Travel&author=John%20Doe', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(response => response.json())
.then(data => console.log(data));</code></pre>

    <h3>Updating a Blog</h3>
    <pre><code>// Update a blog
fetch('${req.protocol}://${req.get('host')}/api/blogs/61a1b2c3d4e5f6a7b8c9d0e1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  body: JSON.stringify({
    title: 'Updated: Getting Started with MERN Stack',
    content: 'Updated content about MERN stack development...'
  })
})
.then(response => response.json())
.then(data => console.log(data));</code></pre>

    <h3>Deleting a Blog</h3>
    <pre><code>// Delete a blog
fetch('${req.protocol}://${req.get('host')}/api/blogs/61a1b2c3d4e5f6a7b8c9d0e1', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
})
.then(response => response.json())
.then(data => console.log(data));</code></pre>

    <h2>Authentication Notes</h2>
    <ul>
      <li>JWT tokens are valid for 7 days by default.</li>
      <li>Always include the token in the Authorization header for protected endpoints.</li>
      <li>Passwords are securely hashed using bcrypt before storage.</li>
    </ul>

    <h2>Blog Categories</h2>
    <p>The API supports the following blog categories:</p>
    <ul>
      <li>Career</li>
      <li>Finance</li>
      <li>Travel</li>
      <li>Technology</li>
      <li>Lifestyle</li>
      <li>Other</li>
    </ul>

    <h2>Rate Limiting</h2>
    <p>To prevent abuse, the API implements rate limiting. Excessive requests from the same IP address may be temporarily blocked.</p>

    <h2>CORS</h2>
    <p>Cross-Origin Resource Sharing (CORS) is enabled for all origins to allow frontend applications to communicate with the API.</p>

    <footer style="margin-top: 50px; text-align: center; color: #7f8c8d; font-size: 0.9em;">
      <p>Blog API Documentation | Created with Express.js</p>
      <p>© ${new Date().getFullYear()} - All rights reserved</p>
    </footer>
  </body>
  </html>
  `;
  
  res.send(html);
});

export default router;
