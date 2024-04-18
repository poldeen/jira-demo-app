import { useAuth } from 'providers/AuthProvider';
import React, { useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarTop = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth({ ...auth, loggedIn: true });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('resources');
    setAuth({ ...auth, loggedIn: false });
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Demo Site
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {auth.loggedIn ? (
              <>
                <Nav.Link as={Link} to="/">
                  Documentation
                </Nav.Link>

                <Nav.Link as={Link} to="jira">
                  Jira Demo
                </Nav.Link>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="d-flex justify-content-end">
        {auth.loggedIn ? (
          <Button as={Link} to="/" onClick={logout}>
            Logout
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
