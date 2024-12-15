import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Timer as TimerIcon, 
  Category as CategoryIcon,
  Language as WebsiteIcon,
  YouTube as YouTubeIcon,
  Podcasts as PodcastIcon,
  Article as BlogIcon,
  PlayCircleOutline as VideoIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';
import { useSettings } from '../context/SettingsContext';
import { resourceTypes } from '../data/learningResources';

const LearningHub = () => {
  const { settings } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(settings.learningResources)[0]);
  const [selectedType, setSelectedType] = useState('videos');
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([]);

  // Update resources when settings, category, or type changes
  useEffect(() => {
    const categoryResources = settings.learningResources[selectedCategory]?.[selectedType] || [];
    setResources(categoryResources);
  }, [settings, selectedCategory, selectedType]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset to first available type for the category
    const availableTypes = Object.keys(settings.learningResources[category] || {})
      .filter(type => settings.learningResources[category][type].length > 0);
    setSelectedType(availableTypes[0] || 'videos');
  };

  const handleTypeChange = (event, newValue) => {
    setSelectedType(newValue);
  };

  const filteredResources = settings.learningResources[selectedCategory]?.[selectedType]?.filter(
    (resource) => 
      !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getResourceIcon = (type) => {
    const iconMap = {
      'YouTube': <YouTubeIcon />,
      'Website': <WebsiteIcon />,
      'Blog': <BlogIcon />,
      'Podcast': <PodcastIcon />,
      'videos': <VideoIcon />,
      'documents': <DocumentIcon />,
    };
    return iconMap[type] || <WebsiteIcon />;
  };

  const ExternalSiteCard = ({ resource }) => (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {getResourceIcon(resource.type)}
          <Typography variant="h6" sx={{ ml: 2 }}>
            {resource.title}
          </Typography>
        </Box>
        {resource.description && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {resource.description}
          </Typography>
        )}
        <Chip 
          icon={<CategoryIcon />} 
          label={resource.type} 
          size="small" 
          sx={{ mt: 1 }} 
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={resource.link}
          target="_blank"
          startIcon={getResourceIcon(resource.type)}
        >
          Visit Site
        </Button>
      </CardActions>
    </Card>
  );

  const ResourceCard = ({ resource }) => (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {resource.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {resource.description}
        </Typography>
        {resource.duration && (
          <Box display="flex" alignItems="center" gap={1}>
            <TimerIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {resource.duration}
            </Typography>
          </Box>
        )}
        {resource.type && (
          <Chip
            icon={<CategoryIcon />}
            label={resource.type}
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={resource.link}
          target="_blank"
          startIcon={getResourceIcon(resource.type)}
        >
          {resource.type === 'videos' ? 'Watch Video' : 'View Document'}
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Sidebar - Categories */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {Object.keys(settings.learningResources).map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? 'contained' : 'outlined'}
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setSelectedCategory(category);
                    // Reset to first type when changing category
                    setSelectedType(Object.keys(resourceTypes)[0]);
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} md={10}>
            {/* Resource Type Tabs */}
            <Tabs
              value={selectedType}
              onChange={(e, newType) => setSelectedType(newType)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {Object.keys(resourceTypes).map((type) => (
                <Tab 
                  key={type} 
                  value={type}
                  label={resourceTypes[type].label} 
                  icon={resourceTypes[type].icon} 
                />
              ))}
            </Tabs>

            {/* Search Bar */}
            <TextField
              fullWidth
              variant="outlined"
              label="Search Resources"
              sx={{ mt: 2, mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Resources Grid */}
            {filteredResources.length === 0 ? (
              <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="300px"
              >
                <CategoryIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  No resources found in this category
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adding resources in the Settings page
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredResources.map((resource, index) => (
                  <Grid item xs={12} sm={6} md={4} key={resource.id || index}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column' 
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {resource.title}
                        </Typography>
                        {resource.description && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            {resource.description}
                          </Typography>
                        )}
                        {resource.duration && (
                          <Box 
                            display="flex" 
                            alignItems="center" 
                            sx={{ mb: 1 }}
                          >
                            <TimerIcon sx={{ mr: 1, fontSize: 20 }} />
                            <Typography variant="caption">
                              {resource.duration}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                      <CardActions>
                        {resource.link && (
                          <Button 
                            size="small" 
                            color="primary" 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View Resource
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LearningHub;
