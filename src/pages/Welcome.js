import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Welcome = () => {
  const { settings } = useSettings();

  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {settings.companyLogo && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 4 
          }}>
            <img 
              src={settings.companyLogo} 
              alt="Company Logo" 
              style={{ 
                maxHeight: 150, 
                maxWidth: '100%', 
                objectFit: 'contain' 
              }} 
            />
          </Box>
        )}

        <Typography variant="h3" component="h1" gutterBottom align="center">
          PMO Virtual Interview
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Personal Message
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {settings.welcomeMessage}
          </Typography>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Video Introduction
          </Typography>
          
          {settings.youtubeUrl ? (
            <Box sx={{ mt: 2, position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                src={`https://www.youtube.com/embed/${getVideoId(settings.youtubeUrl)}`}
                title="PMO Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              No introduction video has been configured. Please contact the administrator.
            </Typography>
          )}
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/assessment"
            sx={{ mr: 2 }}
          >
            Start Assessment
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/learning-hub"
          >
            Learning Hub
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Welcome;
