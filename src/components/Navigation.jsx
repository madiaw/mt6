import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.theme.primary};
`;

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <StyledNavbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Gestion de stock Armée</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/">Tableau de bord</Nav.Link>
                <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                <Nav.Link as={Link} to="/movement">Mouvements</Nav.Link>
                <Nav.Link as={Link} to="/alerts">Alertes</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Nav>
              <Navbar.Text className="me-2">
                Connecté en tant que : {user.username}
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>Déconnexion</Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}

export default Navigation;