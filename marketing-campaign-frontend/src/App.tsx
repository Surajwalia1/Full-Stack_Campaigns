import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material'; // Added Typography for loading text
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./pages/Home')); // Lazy-load Home
const Login = lazy(() => import('./pages/Login')); // Lazy-load Login

const LoadingFallback: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <CircularProgress />
    <Typography variant="h6" style={{ marginTop: '10px' }}>
      Loading, please wait...
    </Typography>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Define this route */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
