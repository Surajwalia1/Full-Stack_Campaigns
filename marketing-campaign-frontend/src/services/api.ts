import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


 /**
     * Mutation for logging in a user.
     *
     * @param {Object} credentials - User credentials.
     * @param {string} credentials.email - User email.
     * @param {string} credentials.password - User password.
     * 
     * @returns {Object} - Response data from the server.
     */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), 
  
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    /**
     * Mutation for registering a new user.
     *
     * @param {Object} credentials - User credentials.
     * @param {string} credentials.email - User email.
     * @param {string} credentials.password - User password.
     * 
     * @returns {Object} - Response data from the server.
     */
    register: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),


    /**
     * Mutation for creating a new campaign.
     *
     * @param {Object} campaignData - Campaign details.
     * @param {string} campaignData.message - Campaign message.
     * @param {string} campaignData.category - Campaign category.
     * @param {string} campaignData.scheduledTime - Campaign scheduled time.
     * @param {string} campaignData.repeatPattern - Campaign repeat pattern.
     * 
     * @returns {Object} - Response data from the server.
     */
    createCampaign: builder.mutation({
      query: (campaignData: {
        message: string;
        category: string;
        scheduledTime: string;
        repeatPattern: string;
      }) => ({
        url: '/campaigns/create',
        method: 'POST',
        body: campaignData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
      }),
    }),

     /**
     * Mutation for creating a new user.
     *
     * @param {Object} userData - User details.
     * @param {string} userData.email - User email.
     * @param {string} userData.password - User password.
     * @param {string} userData.role - User role.
     * @param {string} [userData.category] - Optional category for user.
     * 
     * @returns {Object} - Response data from the server.
     */
    createUser: builder.mutation({
      query: (userData: {
        email: string;
        password: string;
        role: string;
        category?: string;
      }) => ({
        url: '/users/create',
        method: 'POST',
        body: userData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateCampaignMutation,
  useCreateUserMutation,
} = api;
