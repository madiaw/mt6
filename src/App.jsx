import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ArticleList from './components/ArticleList';
import AddArticle from './components/AddArticle';
import StockMovement from './components/StockMovement';
import Alerts from './components/Alerts';
import Login from './components/Login';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  primary: '#87CEEB', // Bleu ciel
  secondary: '#5F9EA0',
  background: '#F0F8FF',
  text: '#333333',
};

const AppWrapper = styled.div`
  background-color: ${props => props.theme.background};
  min-height: 100vh;
  color: ${props => props.theme.text};
`;

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppWrapper>
          <Router>
            <Navigation />
            <div className="container mt-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/articles" element={<PrivateRoute><ArticleList /></PrivateRoute>} />
                <Route path="/add-article" element={<PrivateRoute><AddArticle /></PrivateRoute>} />
                <Route path="/movement" element={<PrivateRoute><StockMovement /></PrivateRoute>} />
                <Route path="/alerts" element={<PrivateRoute><Alerts /></PrivateRoute>} />
              </Routes>
            </div>
          </Router>
        </AppWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;