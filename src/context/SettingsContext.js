import React, { createContext, useState, useContext, useEffect } from 'react';
import initialLearningResources, { initialLearningResources as defaultResources } from '../data/learningResources';
import { pmoCategories } from '../data/questions';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    isAuthenticated: false,
    adminPassword: 'admin123', // Default password, should be changed
    welcomeMessage: 'Welcome to PMO Virtual Interview',
    youtubeUrl: 'https://www.youtube.com/channel/example',
    learningResources: initialLearningResources,
    companyLogo: null, // New field for company logo
    categories: [...pmoCategories] // Store categories separately to allow dynamic addition
  });

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const addCategory = (newCategory) => {
    // Trim and validate the category name
    const trimmedCategory = newCategory.trim();
    
    // Check if category already exists (case-insensitive)
    if (settings.categories.some(cat => 
      cat.toLowerCase() === trimmedCategory.toLowerCase()
    )) {
      throw new Error('Category already exists');
    }

    // Validate category name
    if (!trimmedCategory) {
      throw new Error('Category name cannot be empty');
    }

    // Add the new category to the categories list
    const updatedCategories = [...settings.categories, trimmedCategory];

    // Add the new category to learning resources with empty resource types
    const updatedLearningResources = {
      ...settings.learningResources,
      [trimmedCategory]: {
        videos: [],
        documents: [],
        courses: [],
        webinars: [],
        downloads: [],
        ebooks: [],
        products: [],
        externalSites: []
      }
    };

    // Update settings with new category and learning resources
    setSettings(prevSettings => ({
      ...prevSettings,
      categories: updatedCategories,
      learningResources: updatedLearningResources
    }));

    return trimmedCategory;
  };

  const removeCategory = (categoryToRemove) => {
    // Prevent removing default categories
    if (pmoCategories.includes(categoryToRemove)) {
      throw new Error('Cannot remove default categories');
    }

    // Remove the category from categories list
    const updatedCategories = settings.categories.filter(
      cat => cat !== categoryToRemove
    );

    // Remove the category from learning resources
    const { [categoryToRemove]: removedCategory, ...remainingResources } = settings.learningResources;

    // Update settings
    setSettings(prevSettings => ({
      ...prevSettings,
      categories: updatedCategories,
      learningResources: remainingResources
    }));
  };

  const updateCompanyLogo = (logoFile) => {
    // Convert file to base64 for storage
    const reader = new FileReader();
    reader.readAsDataURL(logoFile);
    reader.onloadend = () => {
      setSettings(prevSettings => ({
        ...prevSettings,
        companyLogo: reader.result
      }));
    };
  };

  const addLearningResource = (category, type, resource) => {
    setSettings(prevSettings => {
      const updatedResources = { ...prevSettings.learningResources };
      
      // Ensure the category and type exist
      if (!updatedResources[category]) {
        updatedResources[category] = {};
      }
      if (!updatedResources[category][type]) {
        updatedResources[category][type] = [];
      }

      // Add unique ID to the resource
      const newResource = {
        ...resource,
        id: `${type}-${Date.now()}` // Simple unique ID generation
      };

      // Add the new resource
      updatedResources[category][type].push(newResource);

      return {
        ...prevSettings,
        learningResources: updatedResources
      };
    });
  };

  const removeLearningResource = (category, type, index) => {
    setSettings(prevSettings => {
      const updatedResources = { ...prevSettings.learningResources };
      
      // Remove the resource at the specified index
      if (updatedResources[category] && updatedResources[category][type]) {
        updatedResources[category][type].splice(index, 1);
      }

      return {
        ...prevSettings,
        learningResources: updatedResources
      };
    });
  };

  const resetLearningResources = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      learningResources: defaultResources
    }));
  };

  useEffect(() => {
    localStorage.setItem('pmoSettings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider 
      value={{ 
        settings, 
        updateSettings, 
        addLearningResource, 
        removeLearningResource,
        resetLearningResources,
        updateCompanyLogo,
        addCategory,
        removeCategory
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
