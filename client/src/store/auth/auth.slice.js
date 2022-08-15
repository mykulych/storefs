import { createSlice } from '@reduxjs/toolkit';
import { localStorageService } from '../../services';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accountId: localStorageService.getUserId() || null,
    isLoggedIn: !!localStorageService.getAccessToken() || null,
  },
  reducers: {
    succeed: (state, action) => {
      state.accountId = action.payload;
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      state.accountId = null;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice;
