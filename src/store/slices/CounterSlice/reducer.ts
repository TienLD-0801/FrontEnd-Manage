import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CounterType } from '@/store/slices/CounterSlice';

const increment: CaseReducer<CounterType, PayloadAction<number>> = (
  state,
  action,
) => ({ ...state, value: state.value + action.payload });

const decrement: CaseReducer<CounterType, PayloadAction<number>> = (
  state,
  action,
) => ({ ...state, value: state.value - action.payload });

export default {
  increment,
  decrement,
};
