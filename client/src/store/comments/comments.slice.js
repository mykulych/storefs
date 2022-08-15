import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
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
    created: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.unshift(action.payload);
      state.loading = false;
    },
    removed: (state, action) => {
      state.entities = state.entities.filter((x) => x.id !== action.payload);
    },
  },
});

export default commentsSlice;
