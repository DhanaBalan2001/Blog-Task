import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import BlogCard from './BlogCard';
import blogService from '../../services/blog';
import { AuthContext } from '../../context/AuthContext';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const allBlogs = await blogService.getAllBlogs();
      // Filter blogs by the current user's ID
      const myBlogs = allBlogs.filter(blog => blog.userId === currentUser._id);
      setBlogs(myBlogs);
      setError('');
    } catch (err) {
      setError('Failed to fetch your blogs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
        toast.success('Blog deleted successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete blog');
      }
    }
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

  return (
    <Container>
      <h2 className="mb-4">My Blogs</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {blogs.length === 0 ? (
        <Alert variant="info">
          You haven't created any blogs yet. <a href="/create-blog">Create your first blog!</a>
        </Alert>
      ) : (
        <Row>
          {blogs.map(blog => (
            <Col key={blog._id} md={6} lg={4}>
              <BlogCard blog={blog} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBlogs;