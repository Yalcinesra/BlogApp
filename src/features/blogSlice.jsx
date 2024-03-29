import { createSlice } from "@reduxjs/toolkit";
const blogSlice = createSlice({
    name: "blog",

initialState: {
    loading: false,
    error: false,
    blogs: [],
    categories:null,
    detail:"",
    users:[],
    likes:[],
    countOfVisitors:0,
    comments:[],
    userBlog:[],
},
reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    
    
    blogsSuccess:(state,{payload:{data,url}})=>{
        state.loading = false;
        state[url] =data;
    },
    usersSuccess:(state,{payload:{data,url}})=>{
      state.loading = false;
      state.users=data.data;
  },
    catSuccess:(state,{payload:{data,url}})=>{
      state.loading = false;
      state[url] =data.data;
  },
    fetchFail: (state) => {
        state.loading = false;
        state.error = true;
      },
      detailSuccess:(state,{payload:{data}})=>{
        state.loading = false;
        state.detail =data.data;
    },
    commentSuccess:(state,{payload:{data,url}})=>{
      state.loading = false;
      state.comments =data.data;
  },

userBlogSuccess:(state,{payload:{data,url}})=>{
  state.loading = false;
  state.userBlog =data;
},
}


})
export const {
    fetchStart,
      blogsSuccess,
      catSuccess,
      detailSuccess,
    fetchFail,
    usersSuccess,
    commentSuccess,
    userBlogSuccess,
 
  } = blogSlice.actions;
  export default blogSlice.reducer;
  