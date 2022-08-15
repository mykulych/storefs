import { createSlice } from '@reduxjs/toolkit';

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    requested: (state) => {
      state.loading = true;
    },
    received: (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    },
    failed: (state) => {
      state.loading = false;
    },
  },
});

export default subcategoriesSlice;
