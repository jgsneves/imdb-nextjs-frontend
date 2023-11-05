import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
export interface AuthSliceInitialState {
  accessToken: string | null;
  accessTokenExpires: Date | null;
  userEmail: string | null;
  userRole: UserRole | null;
}

export interface LoginActionPayload {
  accessToken: string;
  expiringDate: Date;
  email: string;
  userRole: UserRole;
}

export const initialState: AuthSliceInitialState = {
  accessToken: null,
  accessTokenExpires: null,
  userEmail: null,
  userRole: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginActionPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.accessTokenExpires = action.payload.expiringDate;
      state.userEmail = action.payload.email;
      state.userRole = action.payload.userRole;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.accessTokenExpires = null;
      state.userEmail = null;
      state.userRole = null;
    },
  },
});

export const { logOut, login } = authSlice.actions;

export default authSlice.reducer;
