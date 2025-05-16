import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import blogService from '../../services/blog';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBlogById(id);
        setBlog(data);
        setError('');
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. It may have been deleted or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        navigate('/blogs');
      } catch (err) {
        setError('Failed to delete blog. Please try again.');
        console.error(err);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={() => navigate('/blogs')}>
              Back to Blogs
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="my-5">
        <Alert variant="info">
          <Alert.Heading>Blog Not Found</Alert.Heading>
          <p>The blog you're looking for doesn't exist or has been removed.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={() => navigate('/blogs')}>
              Back to Blogs
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  const isAuthor = currentUser && blog.userId === currentUser._id;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="border-0 shadow-sm">
            {blog.image && (
              <Card.Img 
                variant="top" 
                src={blog.image} 
                alt={blog.title}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                }}
              />
            )}
            <Card.Body className="px-4 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Badge bg="primary" className="px-3 py-2">{blog.category || 'Uncategorized'}</Badge>
                <small className="text-muted">{formatDate(blog.createdAt)}</small>
              </div>
              
              <Card.Title as="h1" className="mb-4">{blog.title}</Card.Title>
              
              <Card.Text className="text-muted mb-4">
                <strong>Author:</strong> {blog.author || 'Unknown'}
              </Card.Text>
              
              {/* Fix: Don't use Card.Text here, use a div instead */}
              <div className="blog-content">
                {blog.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="d-flex justify-content-between mt-5">
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigate('/blogs')}
                >
                  Back to Blogs
                </Button>
                
                {isAuthor && (
                  <div>
                    <Link to={`/edit-blog/${blog._id}`} className="btn btn-outline-secondary me-2">
                      Edit
                    </Link>
                    <Button variant="outline-danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;