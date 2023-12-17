import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@/stores/slices/UserSlice';

const updateUser: CaseReducer<UserType, PayloadAction<UserType>> = (
  state,
  action,
) => {
  return {
    ...state,
    name: action.payload.name,
    email: action.payload.email,
    token: action.payload.token,
  };
};

export default {
  updateUser,
};
