import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', textAlign: 'center' }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 6,
            bgcolor: 'background.paper',
            maxWidth: 500,
            margin: '0 auto',
            border: '1px solid #e0e0e0',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Welcome to the Marketing Campaign Scheduler
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Organize, schedule, and manage your marketing campaigns with ease.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
              Stay on top of your notifications and ensure your marketing strategy is always on track.
            </Typography>
          </motion.div>

          {/* Animated Data Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Box sx={{ mt: 4 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                  >
                    200+
                  </motion.span>
                  <span> Campaigns Created</span>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                  >
                    500+
                  </motion.span>
                  <span> Notifications Sent</span>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                  >
                    300+
                  </motion.span>
                  <span> Users Onboarded</span>
                </Typography>
              </motion.div>
            </Box>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 3,
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                  backgroundColor: '#1565c0',
                },
              }}
              onClick={handleLoginClick}
            >
              Login to Start
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Home;
