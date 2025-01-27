import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store'; // Assuming you have a store.ts that exports RootState
import { api } from '../services/api';

/**
 * Slice for handling authentication state (token, loading, error).
 *
 * @module authSlice
 */

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(api.endpoints.login.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as unknown as string;
      })
      .addMatcher(api.endpoints.register.matchFulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(api.endpoints.register.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.register.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as unknown as string;
      });
  },
});

/**
 * Selector to get the authentication state.
 * 
 * @param {RootState} state - The current Redux state.
 * @returns {AuthState} - The authentication state.
 */

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
