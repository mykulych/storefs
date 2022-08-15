import { HIDE_MODAL, SET_CONTENT, SHOW_MODAL } from '../types';

const handlers = {
  [SHOW_MODAL]: (state, { payload }) => ({ ...payload, visible: true }),
  [HIDE_MODAL]: (state) => ({ ...state, visible: false }),
  [SET_CONTENT]: (state, { payload }) => ({ ...state, ...payload }),
  DEFAULT: (state) => state,
};

export const ModalReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
