import { createSlice } from '@reduxjs/toolkit';
import reducers from '@/store/slices/LanguageSlice/reducer';

export interface LanguageType {
  value: string;
}

const initState: LanguageType = {
  value: 'UK',
};

export const LanguageSlice = createSlice({
  name: 'language',
  initialState: initState,
  reducers: reducers,
});

// Action creators are generated for each case reducer function
export const { updateLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;
