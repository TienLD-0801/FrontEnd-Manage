import { createSlice } from '@reduxjs/toolkit';
import reducers from '@/stores/slices/UserSlice/reducer';

export interface UserType {
  email: string;
  name: string;
  token: string;
}

const initState = {
  email: '',
  name: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: reducers,
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
