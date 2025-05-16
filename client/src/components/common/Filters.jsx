import { Form, Row, Col, Button } from 'react-bootstrap';

const CATEGORIES = ['All', 'Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

const Filters = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilters({
      ...filters,
      category: category === 'All' ? '' : category,
    });
  };

  const handleAuthorChange = (e) => {
    setFilters({
      ...filters,
      author: e.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters({ category: '', author: '' });
  };

  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5>Filter Blogs</h5>
      <Form>
        <Row>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={filters.category || 'All'}
                onChange={handleCategoryChange}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by author name"
                value={filters.author || ''}
                onChange={handleAuthorChange}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button 
              variant="secondary" 
              onClick={handleClearFilters}
              className="mb-3 w-100"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filters;