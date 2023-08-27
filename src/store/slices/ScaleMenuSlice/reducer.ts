import { CaseReducer } from '@reduxjs/toolkit';
import { ScaleMenuType } from '@/store/slices/ScaleMenuSlice';

const updateScale: CaseReducer<ScaleMenuType> = (state) => {
  state.value = !state.value;
};

export default {
  updateScale,
};
