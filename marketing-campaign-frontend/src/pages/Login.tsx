import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../services/api'; // Import RTK mutations
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify for notifications
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  // RTK mutation hooks
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [registerAdmin, { isLoading: registerLoading }] = useRegisterMutation();

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        const response = await login(data).unwrap();
        toast.success('User logged in successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        localStorage.setItem('token', response.token); // Save token to localStorage
        navigate('/dashboard');
      } else {
        const response = await registerAdmin(data).unwrap();
        toast.success('User registered successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setIsLogin(true); // Switch to login mode after successful registration
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column', // Center content vertically
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {isLogin ? 'Login' : 'Register'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    disabled={loginLoading || registerLoading}
                  >
                    {isLogin ? 'Login' : 'Register'}
                  </Button>
                </form>
                <Button
                  onClick={() => setIsLogin(!isLogin)}
                  fullWidth
                  sx={{ marginTop: 1 }}
                >
                  {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

     
      <ToastContainer />
    </>
  );
};

export default Login;
