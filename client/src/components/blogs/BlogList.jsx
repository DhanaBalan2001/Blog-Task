import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import BlogCard from './BlogCard';
import Filters from '../common/Filters';
import blogService from '../../services/blog';

const BlogList = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ category: '', author: '' });

  // Fetch blogs only once when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAllBlogs();
        setAllBlogs(data);
        setFilteredBlogs(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters, allBlogs]);

  // Function to apply filters to allBlogs
  const applyFilters = () => {
    let result = [...allBlogs];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(blog => blog.category === filters.category);
    }
    
    // Apply author filter (case-insensitive partial match)
    if (filters.author) {
      const authorLower = filters.author.toLowerCase();
      result = result.filter(blog => 
        blog.author && blog.author.toLowerCase().includes(authorLower)
      );
    }
    
    setFilteredBlogs(result);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        // Update both arrays
        const updatedBlogs = allBlogs.filter(blog => blog._id !== id);
        setAllBlogs(updatedBlogs);
        setFilteredBlogs(filteredBlogs.filter(blog => blog._id !== id));
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
      <h2 className="mb-4">All Blogs</h2>
      
      <Filters filters={filters} setFilters={setFilters} />
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {filteredBlogs.length === 0 ? (
        <Alert variant="info">
          No blogs found. {filters.category || filters.author ? 'Try changing your filters.' : ''}
        </Alert>
      ) : (
        <Row>
          {filteredBlogs.map(blog => (
            <Col key={blog._id} md={6} lg={4}>
              <BlogCard blog={blog} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BlogList;