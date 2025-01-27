import React from 'react';
import { useCreateUserMutation } from '../services/api';
import { useForm } from 'react-hook-form';
import { TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';

const UserForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data: any) => {
    try {
      await addUser(data).unwrap();
      toast.success('User added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Error adding user.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold">Add User</h2>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />

        <TextField
          label="Role"
          select
          fullWidth
          {...register('role', { required: 'Role is required' })}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          {...register('category')}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Add User'}
        </Button>
      </motion.form>

      {/* Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default UserForm;
