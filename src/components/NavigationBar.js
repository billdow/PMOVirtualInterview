import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import {
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useUsers();
  const { settings } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {settings.companyLogo && (
            <img 
              src={settings.companyLogo} 
              alt="Company Logo" 
              style={{ 
                maxHeight: 50, 
                maxWidth: 150, 
                objectFit: 'contain' 
              }} 
            />
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              ...(settings.companyLogo ? { ml: 2 } : {}) 
            }}
          >
            {!settings.companyLogo && 'PMO Virtual Interview'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            startIcon={<AssessmentIcon />}
            component={Link}
            to="/assessment"
          >
            Assessment
          </Button>
          <Button
            color="inherit"
            startIcon={<SchoolIcon />}
            component={Link}
            to="/learning-hub"
          >
            Learning Hub
          </Button>
          {currentUser?.role === 'admin' && (
            <Button
              color="inherit"
              startIcon={<SettingsIcon />}
              component={Link}
              to="/settings"
            >
              Settings
            </Button>
          )}

          {currentUser ? (
            <>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {currentUser.username[0].toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="textSecondary">
                    Signed in as {currentUser.username}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              startIcon={<AccountCircleIcon />}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
