import { createSlice } from '@reduxjs/toolkit';
import reducers from '@/store/slices/ScaleMenuSlice/reducer';

export interface ScaleMenuType {
  value: boolean;
}

const initState: ScaleMenuType = {
  value: false,
};

export const scaleMenuSlice = createSlice({
  name: 'scale-menu',
  initialState: initState,
  reducers: reducers,
});

// Action creators are generated for each case reducer function
export const { updateScale } = scaleMenuSlice.actions;

export default scaleMenuSlice.reducer;
