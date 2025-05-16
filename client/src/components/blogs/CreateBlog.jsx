import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogForm from './BlogForm';
import blogService from '../../services/blog';

const CreateBlog = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    category: '',
    content: '',
    image: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await blogService.createBlog(values);
      toast.success('Blog created successfully!');
      navigate('/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">Create New Blog</h2>
          <BlogForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            buttonText="Create Blog"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlog;