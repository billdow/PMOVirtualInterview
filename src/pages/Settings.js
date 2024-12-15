import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayCircleOutline as VideoIcon,
  Description as DocumentIcon,
  School as CourseIcon,
  OndemandVideo as WebinarIcon,
  Download as DownloadIcon,
  Book as EbookIcon,
  ShoppingCart as ProductIcon,
  Language as WebsiteIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { pmoCategories } from '../data/questions';
import { resourceTypes } from '../data/learningResources';
import UserManagement from '../components/UserManagement';

// Resource type icons mapping
const resourceTypeIcons = {
  videos: VideoIcon,
  documents: DocumentIcon,
  courses: CourseIcon,
  webinars: WebinarIcon,
  downloads: DownloadIcon,
  ebooks: EbookIcon,
  products: ProductIcon
};

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, addLearningResource, removeLearningResource, updateCompanyLogo, addCategory, removeCategory } = useSettings();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(pmoCategories[0]);
  const [selectedType, setSelectedType] = useState('videos');
  
  // Form states
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtubeUrl || '');
  const [welcomeMessage, setWelcomeMessage] = useState(settings.welcomeMessage || '');
  
  // Logo upload state
  const [logoPreview, setLogoPreview] = useState(settings.companyLogo);

  // Resource dialog states
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [resourceForm, setResourceForm] = useState({
    title: '',
    description: '',
    link: '',
    // Dynamic fields based on resource type
  });
  
  // Feedback states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Dynamic form fields based on resource type
  const getResourceFormFields = (type) => {
    const commonFields = [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'link', label: 'Link/URL', type: 'text', required: true }
    ];

    const typeSpecificFields = {
      videos: [
        { name: 'duration', label: 'Duration', type: 'text' }
      ],
      documents: [
        { name: 'fileSize', label: 'File Size', type: 'text' }
      ],
      courses: [
        { name: 'provider', label: 'Provider', type: 'text' },
        { name: 'duration', label: 'Course Duration', type: 'text' },
        { name: 'price', label: 'Price', type: 'text' }
      ],
      webinars: [
        { name: 'presenter', label: 'Presenter', type: 'text' },
        { name: 'date', label: 'Date', type: 'date' }
      ],
      downloads: [
        { name: 'fileSize', label: 'File Size', type: 'text' }
      ],
      ebooks: [
        { name: 'author', label: 'Author', type: 'text' },
        { name: 'fileSize', label: 'File Size', type: 'text' }
      ],
      products: [
        { name: 'vendor', label: 'Vendor', type: 'text' },
        { name: 'pricing', label: 'Pricing', type: 'text' }
      ]
    };

    return [...commonFields, ...(typeSpecificFields[type] || [])];
  };

  const handleAddResource = () => {
    // Reset form with dynamic fields
    const initialForm = getResourceFormFields(selectedType).reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
    
    setResourceForm(initialForm);
    setShowResourceDialog(true);
  };

  const handleResourceSubmit = () => {
    // Validate required fields
    const requiredFields = getResourceFormFields(selectedType)
      .filter(field => field.required);
    
    const missingFields = requiredFields.filter(field => !resourceForm[field.name]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    // Add the resource
    addLearningResource(selectedCategory, selectedType, resourceForm);
    setSuccess('Resource added successfully');
    setShowResourceDialog(false);
  };

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Render method for learning resources
  const renderLearningResources = () => {
    const currentResources = settings.learningResources?.[selectedCategory]?.[selectedType] || [];
    const ResourceIcon = resourceTypeIcons[selectedType] || DocumentIcon;

    return (
      <Box>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {settings.categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Resource Type</InputLabel>
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                label="Resource Type"
              >
                {Object.entries(resourceTypes).map(([type, label]) => (
                  <MenuItem key={type} value={type}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleAddResource}
            >
              Add Resource
            </Button>
          </Grid>
        </Grid>

        {currentResources.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No resources found for this category and type.
          </Typography>
        ) : (
          <List>
            {currentResources.map((resource, index) => (
              <ListItem key={index}>
                <ResourceIcon sx={{ mr: 2 }} />
                <ListItemText
                  primary={resource.title}
                  secondary={resource.description}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => {
                      removeLearningResource(selectedCategory, selectedType, index);
                      setSuccess('Resource removed successfully');
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    );
  };

  // Resource Dialog
  const renderResourceDialog = () => {
    const formFields = getResourceFormFields(selectedType);

    return (
      <Dialog open={showResourceDialog} onClose={() => setShowResourceDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Add {resourceTypes[selectedType]} Resource for {selectedCategory}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ '& > :not(style)': { my: 1 } }}>
            {formFields.map((field) => (
              <TextField
                key={field.name}
                fullWidth
                name={field.name}
                label={field.label}
                type={field.type}
                value={resourceForm[field.name] || ''}
                onChange={handleResourceChange}
                required={field.required}
                variant="outlined"
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResourceDialog(false)}>Cancel</Button>
          <Button onClick={handleResourceSubmit} color="primary">Save Resource</Button>
        </DialogActions>
      </Dialog>
    );
  };

  // External sites management
  const [openExternalSiteDialog, setOpenExternalSiteDialog] = useState(false);
  const [externalSiteForm, setExternalSiteForm] = useState({
    title: '',
    description: '',
    type: 'Website',
    link: '',
    category: selectedCategory
  });

  const handleExternalSiteDialogOpen = () => {
    setOpenExternalSiteDialog(true);
  };

  const handleExternalSiteDialogClose = () => {
    setOpenExternalSiteDialog(false);
    // Reset form
    setExternalSiteForm({
      title: '',
      description: '',
      type: 'Website',
      link: '',
      category: selectedCategory
    });
    setError('');
  };

  const handleExternalSiteChange = (e) => {
    const { name, value } = e.target;
    setExternalSiteForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateExternalSite = () => {
    // Basic validation
    if (!externalSiteForm.title) {
      setError('Title is required');
      return false;
    }
    
    if (!externalSiteForm.link) {
      setError('Link is required');
      return false;
    }

    // Basic URL validation
    try {
      new URL(externalSiteForm.link);
    } catch {
      setError('Invalid URL');
      return false;
    }

    return true;
  };

  const handleAddExternalSite = () => {
    if (!validateExternalSite()) return;

    // Add unique ID
    const newExternalSite = {
      ...externalSiteForm,
      id: `external-${Date.now()}`
    };

    // Add the external site
    addLearningResource(
      externalSiteForm.category, 
      'externalSites', 
      newExternalSite
    );

    setSuccess('External site added successfully');
    handleExternalSiteDialogClose();
  };

  const handleRemoveExternalSite = (category, index) => {
    removeLearningResource(category, 'externalSites', index);
    setSuccess('External site removed successfully');
  };

  const renderExternalSites = () => {
    const externalSites = settings.learningResources?.[selectedCategory]?.externalSites || [];

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          External Learning Sites
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleExternalSiteDialogOpen}
          sx={{ mb: 2 }}
        >
          Add External Site
        </Button>

        {externalSites.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No external sites added for this category.
          </Typography>
        ) : (
          <List>
            {externalSites.map((site, index) => (
              <ListItem key={site.id}>
                {site.type === 'YouTube' ? <YouTubeIcon sx={{ mr: 2 }} /> : <WebsiteIcon sx={{ mr: 2 }} />}
                <ListItemText
                  primary={site.title}
                  secondary={
                    <>
                      {site.description && `${site.description} | `}
                      <a 
                        href={site.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {site.link}
                      </a>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => handleRemoveExternalSite(selectedCategory, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {/* External Site Dialog */}
        <Dialog 
          open={openExternalSiteDialog} 
          onClose={handleExternalSiteDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add External Learning Site</DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              name="title"
              label="Site Title"
              fullWidth
              margin="normal"
              value={externalSiteForm.title}
              onChange={handleExternalSiteChange}
              required
            />

            <TextField
              name="description"
              label="Description (Optional)"
              fullWidth
              margin="normal"
              value={externalSiteForm.description}
              onChange={handleExternalSiteChange}
              multiline
              rows={2}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Site Type</InputLabel>
              <Select
                name="type"
                value={externalSiteForm.type}
                label="Site Type"
                onChange={handleExternalSiteChange}
              >
                <MenuItem value="Website">Website</MenuItem>
                <MenuItem value="YouTube">YouTube Channel</MenuItem>
                <MenuItem value="Blog">Blog</MenuItem>
                <MenuItem value="Podcast">Podcast</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="link"
              label="URL"
              fullWidth
              margin="normal"
              value={externalSiteForm.link}
              onChange={handleExternalSiteChange}
              required
              placeholder="https://example.com"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={externalSiteForm.category}
                label="Category"
                onChange={handleExternalSiteChange}
              >
                {settings.categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleExternalSiteDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddExternalSite} color="primary" variant="contained">
              Add Site
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please upload a JPEG, PNG, SVG, or WebP image.');
        return;
      }

      if (file.size > maxSize) {
        setError('File is too large. Maximum size is 5MB.');
        return;
      }

      // Create preview and update settings
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        updateCompanyLogo(file);
        setSuccess('Logo uploaded successfully');
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    updateSettings({ companyLogo: null });
    setLogoPreview(null);
    setSuccess('Logo removed successfully');
  };

  const handlePasswordSubmit = () => {
    if (password === settings.adminPassword) {
      updateSettings({ isAuthenticated: true });
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    updateSettings({ adminPassword: newPassword });
    setNewPassword('');
    setConfirmPassword('');
    setSuccess('Password updated successfully');
  };

  const handleGeneralSettingsSave = () => {
    updateSettings({
      welcomeMessage,
      youtubeUrl
    });
    setSuccess('General settings saved successfully');
  };

  if (!settings.isAuthenticated) {
    return (
      <Dialog open={true} onClose={() => navigate('/')}>
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/')}>Cancel</Button>
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Inline CategoryManagement component
  const CategoryManagement = () => {
    const { settings, addCategory, removeCategory } = useSettings();
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const handleAddCategory = () => {
      try {
        // Attempt to add the category
        const addedCategory = addCategory(newCategory);
        
        // Reset dialog state
        setNewCategory('');
        setOpenCategoryDialog(false);
        setCategoryError('');
      } catch (error) {
        // Set error message if category addition fails
        setCategoryError(error.message);
      }
    };

    const handleRemoveCategory = (category) => {
      try {
        removeCategory(category);
      } catch (error) {
        // Optionally handle error (e.g., show a snackbar)
        console.error(error.message);
      }
    };

    return (
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Learning Categories</Typography>
          <IconButton 
            color="primary" 
            onClick={() => setOpenCategoryDialog(true)}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Category Chips */}
        <Box display="flex" flexWrap="wrap" gap={1}>
          {settings.categories.map((category) => (
            <Chip
              key={category}
              label={category}
              color={pmoCategories.includes(category) ? 'default' : 'secondary'}
              onDelete={!pmoCategories.includes(category) 
                ? () => handleRemoveCategory(category) 
                : undefined}
              deleteIcon={!pmoCategories.includes(category) ? <DeleteIcon /> : null}
            />
          ))}
        </Box>

        {/* Add Category Dialog */}
        <Dialog 
          open={openCategoryDialog} 
          onClose={() => {
            setOpenCategoryDialog(false);
            setNewCategory('');
            setCategoryError('');
          }}
        >
          <DialogTitle>Add New Learning Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              variant="outlined"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                setCategoryError('');
              }}
              error={!!categoryError}
              helperText={categoryError}
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => {
                setOpenCategoryDialog(false);
                setNewCategory('');
                setCategoryError('');
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddCategory} 
              color="primary"
              disabled={!newCategory.trim()}
            >
              Add Category
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Company Logo
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="logo-upload"
              type="file"
              onChange={handleLogoUpload}
            />
            <label htmlFor="logo-upload">
              <Button 
                variant="contained" 
                component="span" 
                color="primary"
              >
                Upload Logo
              </Button>
            </label>
            
            {logoPreview && (
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={handleRemoveLogo}
              >
                Remove Logo
              </Button>
            )}
          </Box>

          {logoPreview && (
            <Box sx={{ mt: 2, maxWidth: 300 }}>
              <img 
                src={logoPreview} 
                alt="Company Logo" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: 200, 
                  objectFit: 'contain' 
                }} 
              />
            </Box>
          )}
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Company Settings" />
          <Tab label="Learning Resources" />
          <Tab label="User Management" />
          <Tab label="External Sites" />
          <Tab label="Category Management" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Box component="form" sx={{ '& > :not(style)': { mb: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Welcome Message
            </Typography>
            <TextField
              fullWidth
              label="Welcome Message"
              multiline
              rows={4}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              sx={{ mb: 4 }}
            />

            <Typography variant="h6" gutterBottom>
              Welcome Video URL
            </Typography>
            <TextField
              fullWidth
              label="YouTube Video URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              sx={{ mb: 4 }}
            />

            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handlePasswordChange}
              sx={{ mb: 4 }}
            >
              Update Password
            </Button>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGeneralSettingsSave}
              >
                Save General Settings
              </Button>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {renderLearningResources()}
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <UserManagement />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {renderExternalSites()}
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <CategoryManagement />
        </TabPanel>

        {renderResourceDialog()}
      </Paper>
    </Container>
  );
};

export default Settings;
