import { createSlice } from '@reduxjs/toolkit';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    entities: null,
  },
  reducers: {
    handled: (state, action) => {
      if (!Array.isArray(state.entities)) state.entities = [];
      state.entities.push(action.payload);
    },
    cleared: (state) => {
      state.entities = null;
    },
  },
});

export default errorsSlice;
