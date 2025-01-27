import React, { useState } from 'react';
import { Tabs, Tab, Button, CircularProgress, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CampaignForm from '../components/CampaignForm';
import UserForm from '../components/UserForm';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton loader
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);  // Tab index instead of string for easier handling
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Add loading state for skeleton visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to Home page
  };

  const handleLogoutClick = () => {
    // Clear session or JWT token (adjust this depending on your authentication setup)
    localStorage.removeItem('token'); // Example for removing token from localStorage
    navigate('/login'); // Redirect to Login page after logout
  };

  // Simulating data loading, to show skeleton
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);  // Simulate loading finished
    }, 2000);  // Delay for 2 seconds for demo purposes

    return () => clearTimeout(timer); // Cleanup timer
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Eye-catching header using AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Box>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleHomeClick}
              sx={{ marginRight: 2 }}
            >
              Home
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="p-6">
        <div className="bg-white p-4 rounded shadow">
          {/* Material UI Tabs for switching between "Campaigns" and "Users" */}
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="admin dashboard tabs">
            <Tab label="Manage Campaigns" />
            <Tab label="Manage Users" />
          </Tabs>

          {/* Motion for tab content transitions */}
          <motion.div
            key={activeTab}  // Using `key` to trigger reanimation when the active tab changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className="skeleton-container">
                <Skeleton count={5} height={50} width="100%" className="skeleton-shimmer" />
              </div>
            ) : activeTab === 0 ? (
              <CampaignForm />
            ) : (
              <UserForm />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
