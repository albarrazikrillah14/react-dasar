import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'counter',
  initialState: 10,
  reducers: {
    increment: (state) => {
      return state + 1
    },
    decrement: (state) => {
      return state - 1
    }
   }
});

export const {increment, decrement} = counterSlice.actions