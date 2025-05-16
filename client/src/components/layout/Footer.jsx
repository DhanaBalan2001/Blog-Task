import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} Blog App. All rights reserved.</p>
        <p className="mb-0 small">A multi-user blogging platform</p>
      </Container>
    </footer>
  );
};

export default Footer;