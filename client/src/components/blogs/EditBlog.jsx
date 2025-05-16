import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogForm from './BlogForm';
import blogService from '../../services/blog';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        console.error('Error in fetchBlog:', err);
        if (err.response && err.response.status === 404) {
          setError('Blog not found. It may have been deleted or you may not have permission to view it.');
        } else {
          setError('Failed to fetch blog. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await blogService.updateBlog(id, values);
      toast.success('Blog updated successfully!');
      navigate('/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update blog');
    } finally {
      setSubmitting(false);
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

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">Edit Blog</h2>
          {blog && (
            <BlogForm
              initialValues={{
                title: blog.title,
                category: blog.category,
                content: blog.content,
                image: blog.image || '',
              }}
              onSubmit={handleSubmit}
              buttonText="Update Blog"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EditBlog;