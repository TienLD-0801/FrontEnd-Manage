import { createSlice } from '@reduxjs/toolkit';
import reducers from '@/store/slices/CounterSlice/reducer';

export interface CounterType {
  value: number;
}

const initState: CounterType = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initState,
  reducers: reducers,
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
