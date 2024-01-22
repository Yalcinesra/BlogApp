import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
    _id:"",
    email:"",
    firstName:"",
    lastName:"",
    image:"",
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state,{payload})=>{
      state.loading = false;
      state.currentUser = payload.data.username;
      state.token = payload.token;
      state._id=payload?.data?._id;
      state.firstName=payload?.data?.firstName;
      state.lastName=payload?.data?.lastName;
      state.image=payload?.data?.image;
    },
  
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user?.username;
      // state.isAdmin = payload?.user?.isAdmin;
      state._id=payload?.user?._id;
      state.email=payload?.user?.email;
      state.token = payload?.token;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.isAdmin = false;
      state.token = null;
    },
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  registerSuccess,
  logoutSuccess,
  loginSuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
