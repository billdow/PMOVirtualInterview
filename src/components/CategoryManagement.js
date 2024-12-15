import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { useSettings } from '../context/SettingsContext';
import { pmoCategories } from '../data/questions';

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
        <Tooltip title="Add New Category">
          <IconButton 
            color="primary" 
            onClick={() => setOpenCategoryDialog(true)}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
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

export default CategoryManagement;
