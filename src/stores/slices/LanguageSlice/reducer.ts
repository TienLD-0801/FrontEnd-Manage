import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType } from '@/stores/slices/LanguageSlice';

const updateLanguage: CaseReducer<LanguageType, PayloadAction<LanguageType>> = (
  state,
  action,
) => {
  state.value = action.payload.value;
};

export default {
  updateLanguage,
};
