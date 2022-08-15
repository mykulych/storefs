import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    entity: null,
    loading: false,
  },
  reducers: {
    requested: (state) => {
      state.loading = true;
    },
    received: (state, action) => {
      state.entity = action.payload;
      state.loading = false;
    },
    failed: (state) => {
      state.loading = false;
    },
    accountRemoved: (state) => {
      state.entity = null;
    },
    updated: (state, aciton) => {
      state.entity = aciton.payload;
    },
  },
});

export default accountSlice;
