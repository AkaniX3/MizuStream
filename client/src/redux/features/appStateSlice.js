import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice({
  name: "AppState",
  initialState: {
    appState: ""
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.appState = action.payload;
    }
  }
});

export const {
  setappState
} = appStateSlice.actions;

export default appStateSlice.reducer;