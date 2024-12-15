import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import NavigationBar from './components/NavigationBar';
import Welcome from './pages/Welcome';
import Assessment from './pages/Assessment';
import LearningHub from './pages/LearningHub';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { SettingsProvider } from './context/SettingsContext';
import { UserProvider } from './context/UserContext';
import { Box } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <SettingsProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <NavigationBar />
              <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', pt: 2 }}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Welcome />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/assessment"
                    element={
                      <ProtectedRoute>
                        <Assessment />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/learning-hub"
                    element={
                      <ProtectedRoute>
                        <LearningHub />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  {/* Catch all route - redirect to login */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </SettingsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
