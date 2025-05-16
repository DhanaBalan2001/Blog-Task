import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const BlogCard = ({ blog, onDelete }) => {
  const { currentUser } = useContext(AuthContext);
  
  // Safety check - if blog is undefined or null, don't render anything
  if (!blog) {
    return null;
  }
  
  const isAuthor = currentUser && blog.userId === currentUser._id;
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <Card className="mb-4 shadow-sm h-100">
      {blog.image && (
        <Card.Img 
          variant="top" 
          src={blog.image} 
          alt={blog.title}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
          }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="primary">{blog.category || 'Uncategorized'}</Badge>
          <small className="text-muted">{blog.createdAt ? formatDate(blog.createdAt) : 'Unknown date'}</small>
        </div>
        <Card.Title>{blog.title || 'Untitled Blog'}</Card.Title>
        <Card.Text>{truncateContent(blog.content)}</Card.Text>
        <Card.Text className="text-muted">
          <small>Author: {blog.author || 'Unknown'}</small>
        </Card.Text>
        <div className="d-flex justify-content-between mt-auto">
          <Link to={`/blogs/${blog._id}`} className="btn btn-outline-primary">
            Read More
          </Link>
          {isAuthor && (
            <div>
              <Link to={`/edit-blog/${blog._id}`} className="btn btn-outline-secondary me-2">
                Edit
              </Link>
              <Button variant="outline-danger" onClick={() => onDelete(blog._id)}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;