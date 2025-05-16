import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card } from 'react-bootstrap';

const CATEGORIES = ['Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  category: Yup.string()
    .oneOf(CATEGORIES, 'Please select a valid category')
    .required('Category is required'),
  content: Yup.string()
    .min(20, 'Content must be at least 20 characters')
    .required('Content is required'),
  image: Yup.string().url('Must be a valid URL').nullable(),
});

const BlogForm = ({ initialValues, onSubmit, buttonText }) => {
  return (
    <Card>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={BlogSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter blog title"
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <Field as="select" name="category" className="form-select">
                  <option value="">Select a category</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <Field
                  as="textarea"
                  name="content"
                  className="form-control"
                  rows="6"
                  placeholder="Write your blog content here"
                />
                <ErrorMessage name="content" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image URL (optional)</label>
                <Field
                  type="text"
                  name="image"
                  className="form-control"
                  placeholder="Enter image URL"
                />
                <ErrorMessage name="image" component="div" className="text-danger" />
              </div>

              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-100"
              >
                {isSubmitting ? 'Submitting...' : buttonText}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default BlogForm;