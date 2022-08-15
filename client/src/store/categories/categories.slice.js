import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    entities: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    requested: (state) => {
      state.loading = true;
    },
    received: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.loading = false;
    },
    failed: (state) => {
      state.loading = false;
    },
  },
});

export default categoriesSlice;
