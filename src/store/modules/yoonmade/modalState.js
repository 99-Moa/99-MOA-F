import { createSlice } from "@reduxjs/toolkit";

const modalState = createSlice({
  name: "modalState",
  initialState: { alarmState: false, profileState: false },
  reducers: {
    getAlarmState: (state, action) => {
      state.alarmState = action.payload;
    },
    getProfileState: (state, action) => {
      state.profileState = action.payload;
    },
  },
});

export const { getAlarmState, getProfileState } = modalState.actions;
export default modalState;
