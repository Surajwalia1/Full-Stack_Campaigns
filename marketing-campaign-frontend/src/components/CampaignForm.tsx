import React from 'react';
import { useCreateCampaignMutation } from '../services/api';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';

const CampaignForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();

  const onSubmit = async (data: any) => {
    try {
      await createCampaign(data).unwrap();
      toast.success('Campaign created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Error creating campaign.', {
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
        <h2 className="text-xl font-semibold">Create Campaign</h2>

        {/* Message Field with padding */}
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          {...register('message', { required: 'Message is required' })}
          error={!!errors.message}
          helperText={errors.message ? errors.message.message : ''}
          sx={{ padding: '8px' }}  // Add padding
        />

        {/* Category Field with padding */}
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          {...register('category', { required: 'Category is required' })}
          error={!!errors.category}
          helperText={errors.category ? errors.category.message : ''}
          sx={{ padding: '8px' }}  // Add padding
        />

        {/* Scheduled Time Field with padding */}
        <TextField
          label="Scheduled Time"
          variant="outlined"
          type="datetime-local"
          fullWidth
          {...register('scheduledTime', { required: 'Scheduled Time is required' })}
          error={!!errors.scheduledTime}
          helperText={errors.scheduledTime ? errors.scheduledTime.message : ''}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ padding: '8px' }}  // Add padding
        />

        {/* Repeat Pattern Field with padding */}
        <TextField
          label="Repeat Pattern"
          variant="outlined"
          fullWidth
          {...register('repeatPattern')}
          sx={{ padding: '8px' }}  // Add padding
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Create Campaign'}
        </Button>
      </motion.form>

      {/* Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default CampaignForm;
